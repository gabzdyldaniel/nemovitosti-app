import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ContractService } from './contract.service';
import { Contract } from './contract.schema';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtAuthGuard } from '../auth/guards/auth.guard';
import { Issue } from '../issue/issue.schema';
import { Payment } from '../payment/payment.schema';
import { Tenant } from '../tenant/tenant.schema';

@Controller('contracts')
export class ContractController {
  constructor(private _contractService: ContractService) {
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  listAction(
    @Param('propertyId') propertyId: string
  ) {
    return this._contractService.listAction();
  }

  @Post(':propertyId')
  @UseGuards(JwtAuthGuard)
  createAction(
    @Param('propertyId') propertyId: string,
    @Body() contract: Contract,
    @Req() req: any
  ) {
    return this._contractService.createAction(contract, req.user._id, propertyId).pipe(
      catchError(err => of({error: err.message}))
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateAction(
    @Param('id') id: string,
    @Body() contract: Contract
  ) {
    return this._contractService.updateAction(id, contract).pipe(
      catchError(err => of({error: err.message}))
    );
  }

  @Delete(':id/:propertyId')
  @UseGuards(JwtAuthGuard)
  deleteAction(
    @Param('id') id: string,
    @Param('propertyId') propertyId: string,
  ) {
    return this._contractService.deleteAction(id, propertyId).pipe(
      catchError(err => of({error: err.message}))
    );
  }

  /*
    Tenants
  */
  @Post(':id/tenants')
  @UseGuards(JwtAuthGuard)
  addTenantsAction(
    @Param('id') id: string,
    @Body() tenants: Tenant[]
  ) {
    return this._contractService.addTenantsAction(id, tenants).pipe(
      catchError(err => of({error: err.message}))
    );
  }

  @Delete(':id/tenants/:tenantId')
  @UseGuards(JwtAuthGuard)
  removeTenantAction(
    @Param('id') id: string,
    @Param('tenantId') tenantId: string,
  ) {
    return this._contractService.deleteTenantAction(id, tenantId).pipe(
      catchError(err => of({error: err.message}))
    );
  }

  /*
    Issues
  */
  @Post(':id/issues')
  @UseGuards(JwtAuthGuard)
  addIssueAction(
    @Param('id') id: string,
    @Body() issue: Issue
  ) {
    return this._contractService.addIssueAction(id, issue).pipe(
      catchError(err => of({error: err.message}))
    );
  }

  @Put(':id/issues/:issueId')
  @UseGuards(JwtAuthGuard)
  updateIssueAction(
    @Param('id') id: string,
    @Param('issueId') issueId: string,
    @Body() issue: Issue
  ) {
    return this._contractService.updateIssueAction(id, issueId, issue).pipe(
      catchError(err => of({error: err.message}))
    );
  }

  @Delete(':id/issues/:issueId')
  @UseGuards(JwtAuthGuard)
  deleteIssueAction(
    @Param('id') id: string,
    @Param('issueId') issueId: string,
  ) {
    return this._contractService.deleteIssueAction(id, issueId).pipe(
      catchError(err => of({error: err.message}))
    );
  }

  /*
    Payments
  */
  @Post(':id/payments')
  @UseGuards(JwtAuthGuard)
  addPaymentAction(
    @Param('id') id: string,
    @Body() payment: Payment
  ) {
    return this._contractService.addPaymentAction(id, payment).pipe(
      catchError(err => of({error: err.message}))
    );
  }

  // TODO delete payment

  @Patch(':id/payments/:paymentId')
  @UseGuards(JwtAuthGuard)
  patchPaymentPaidAction(
    @Param('id') id: string,
    @Param('paymentId') paymentId: string,
  ) {
    return this._contractService.patchPaymentPaidAction(id, paymentId);
  }
}

