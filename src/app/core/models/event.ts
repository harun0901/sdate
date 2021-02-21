import { Entity } from './base';
import { User } from './user';

export enum EventType {
  YourProjectIsApproved = 'YOUR_PROJECT_IS_APPROVED',
  YourProjectHasUpdated = 'YOUR_PROJECT_HAS_UPDATED',
  YouHaveNewEstimate = 'YOU_HAVE_NEW_ESTIMATE',
  YouHaveNewProposal = 'YOU_HAVE_NEW_PROPOSAL',
  YourProposalHasBeenChanged = 'YOUR_PROPOSAL_HAS_BEEN_CHANGED',
  YouHaveNewMilestonePaymentRequest = 'YOU_HAVE_NEW_MILESTONE_PAYMENT_REQUEST',
  YourApplicationIsApproved = 'YOUR_APPLICATION_IS_APPROVED',
  YouHaveNewSiteVisitScheduled = 'YOU_HAVE_NEW_SITE_VISIT_SCHEDULED',
  YourMilestoneHasBeenPaid = 'YOUR_MILESTONE_HAS_BEEN_PAID',
  YourMilestoneHasBeenChanged = 'YOUR_MILESTONE_HAS_BEEN_CHANGED',
  YourProposalHasBeenAccepted = 'YOUR_PROPOSAL_HAS_BEEN_ACCEPTED',
  NewProjectHasBeenRegistered = 'NEW_PROJECT_HAS_BEEN_REGISTERED',
  EstimateHasBeenAccepted = 'ESTIMATE_HAS_BEEN_ACCEPTED',
  EstimateHasBeenDeclined = 'ESTIMATE_HAS_BEEN_DECLINED',
  FinalProposalHasBeenAccepted = 'FINAL_PROPOSAL_HAS_BEEN_ACCEPTED',
  FinalProposalHasBeenDeclined = 'FINAL_PROPOSAL_HAS_BEEN_DECLINED',
  UserRegisteredEvent = 'NEW_USER_REGISTERED',
  CustomerReleasedMilestoneEvent = 'CUSTOMER_RELEASE_MILESTONE',
  ConsultantRequestedToReleaseMilestone = 'CONSULTANT_REQUESTED_TO_RELEASE_MILESTONE',
  ConsultantConfirmedCashPayment = 'CONSULTANT_CONFIRMED_CASH_PAYMENT',
  ConsultantConfirmedFinancePayment = 'CONSULTANT_CONFIRMED_FINANCE_PAYMENT',
  CustomerRequestedCashPaymentEvent = 'CUSTOMER_REQUESTED_CASH_PAYMENT',
  CustomerRequestedFinancePaymentEvent = 'CUSTOMER_REQUESTED_FINANCE_PAYMENT_EVENT',
  ConsultantRequestedReviewEvent = 'CONSULTANT_REQUESTED_REVIEW',
  CustomerSignedContractEvent = 'CUSTOMER_SIGNED_CONTRACT_EVENT',
  ContractReadyEvent = 'CONTRACT_READY_EVENT',
  CustomerAcceptedContractEvent = 'CUSTOMER_ACCEPTED_CONTRACT_EVENT',
  CustomerRescheduledSiteVisitEvent = 'CUSTOMER_RESCHEDULED_SITE_VISIT_EVENT',
  CustomerRequestedSiteVisitChangeEvent = 'CUSTOMER_REQUESTED_MORE_SITE_VISIT_EVENT',
  CustomerCanceledSiteVisitEvent = 'CUSTOMER_CANCELED_SITE_VISIT_EVENT',
  SiteVisitScheduleUpdatedEvent = 'SITE_VISIT_SCHEDULE_UPDATED_EVENT',
  PickOutPaversScheduleUpdatedEvent = 'PICK_OUT_PAVERS_SCHEDULE_UPDATED_EVENT',
  ContractorProfileUpdatedEvent = 'CONTRACTOR_PROFILE_UPDATED_EVENT',
  AdminApprovedBasicProfileEvent = 'ADMIN_APPROVED_BASIC_PROFILE_EVENT',
  AdminDeclinedOnboardingContractorEvent = 'ADMIN_DECLINED_ONBOARDING_CONTRACTOR_EVENT',
  ContractorSignedLegalTermsEvent = 'CONTRACTOR_SIGNED_LEGAL_TERMS_EVENT',
  ContractorSetupPaymentEvent = 'CONTRACTOR_SETUP_PAYMENT_EVENT',
  ConsultantInvitedContractorToProjectEvent = 'CONSULTANT_INVITED_CONTRACTOR_TO_PROJECT_EVENT',
  SitePlanUpdatedEvent = 'SITE_PLAN_UPDATED_EVENT',
  ContractorAcceptedProjectEvent = 'CONTRACTOR_ACCEPTED_PROJECT_EVENT',
  ContractorDeclinedProjectEvent = 'CONTRACTOR_DECLINED_PROJECT_EVENT',
  ContractorFinishedProjectEvent = 'CONTRACTOR_FINISHED_PROJECT_EVENT',
  ContractorRequestedMilestoneReleaseEvent = 'CONTRACTOR_REQUESTED_MILESTONE_RELEASE_EVENT',
  ConsultantRequestedMilestoneReleaseEvent = 'CONSULTANT_REQUESTED_MILESTONE_RELEASE_EVENT',
  AdminPaidSubContractMilestoneEvent = 'ADMIN_PAID_SUB_CONTRACT_MILESTONE_EVENT',
}

export interface Event extends Entity {
  type: EventType;
  message: string;
  user: User;
  meta: any;
  readAt?: string;
}

export interface EventPagination {
  events: Event[];
  total: number;
}
