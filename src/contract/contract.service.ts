import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as mongoose from 'mongoose';
import { Contract, ContractDocument } from './contract.schema';
import { from } from 'rxjs';
import { Issue } from '../issue/issue.schema';
import { Cron, CronExpression } from '@nestjs/schedule';
import { Payment } from '../payment/payment.schema';
import { first, map, switchMap, tap } from 'rxjs/operators';
import { Tenant } from '../tenant/tenant.schema';
import { PropertyDocument } from '../property/property.schema';

@Injectable()
export class ContractService {
  constructor(
    @InjectModel('Contract') private readonly model: Model<ContractDocument>,
    @InjectModel('Property') private readonly propertyModel: Model<PropertyDocument>
  ) {
  }

  listAction() {
    return from(
      this.model.find()
    )
  }

  createAction(contract: Contract, userId: string, propertyId: string) {
    return from(
      new this.model({ ...contract, property: propertyId, ownedBy: userId }).save()
    ).pipe(
      switchMap((response) => {
        return from(
          this.propertyModel.findOneAndUpdate({ _id: propertyId }, { $push: { contracts: response._id } })
        )
      })
    )
  }

  updateAction(id: string, contract: Contract) {
    return from(
      this.model.findOneAndUpdate({_id: id}, contract)
    );
  }

  deleteAction(id: string, propertyId: string) {
    return from(
      this.model.findOneAndDelete({_id: id})
    ).pipe(
      switchMap(() => {
        return from(
          this.propertyModel.findOneAndUpdate({_id: propertyId}, { $pull: { contracts: { _id: mongoose.Types.ObjectId(id) } } })
        )
      })
    );
  }

  addTenantsAction(id: string, tenants: Tenant[]) {
    return from(
      this.model.findOneAndUpdate({'_id': id}, { $push: { tenants: { $each: tenants } } }, { runValidators: true })
    );
  }

  deleteTenantAction(id: string, tenantId: string) {
    return from(
      this.model.findOneAndUpdate({_id: id}, { $pull: { tenants: { _id: mongoose.Types.ObjectId(tenantId) } } })
    );
  }

  addIssueAction(id: string, issue: Issue) {
    return from(
      this.model.findOneAndUpdate({_id: id}, { $push: { issues: issue } })
    )
  }

  updateIssueAction(id: string, issueId: string, issue: Issue) {
    return from(
      this.model.findOneAndUpdate({'issues._id': issueId}, { 'issues.$': issue })
    );
  }

  deleteIssueAction(id: string, issueId: string) {
    return from(
      this.model.findOneAndUpdate({_id: id}, { $pull: { issues: { _id: mongoose.Types.ObjectId(issueId) } } })
    )
  }

  addPaymentAction(id: string, payment: Payment) {
    return from(
      this.model.findOneAndUpdate({_id: id}, { $push: { payments: payment } })
    )
  }

  patchPaymentPaidAction(id: string, paymentId: string) {
    return from(
      this.model.updateOne({'_id': id, 'payments._id': paymentId}, { $set: { 'payments.$.paid': true } })
    );
  }

  @Cron(CronExpression.EVERY_1ST_DAY_OF_MONTH_AT_MIDNIGHT)
  addMonthlyPayment() {
    from(
      this.model.find()
    ).pipe(
      first(),
      map((contracts) => {
        return contracts.filter(contract => contract.active)
      }),
      tap((contracts) => {
        contracts.forEach(async contract => {
          const dueDate = new Date();
          dueDate.setDate(dueDate.getDate() + contract.payday);

          contract.payments.push({
            note: 'N??jemn??',
            dueDate,
            amount: contract.rent + contract.energyDeposit + contract.additionalFees
          });

          contract.save();
        });
      })
    ).subscribe();
  }
}
