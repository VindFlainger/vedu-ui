import { Controls } from "~/api/handler";
import _fetch from '~/api/handler'
import { NitroFetchOptions } from "nitropack";
import { Question, QuestionAnswers, QuestionTag } from "~/models/QuestionModel";


export interface AddCardPayload {
    card_number: string
    expiration: string
    cvv: string
}

export interface AddCardData {
    card_number: string
    expiration: string
    cvv: string
}

export interface AddCardPayload {
    card_number: string
    expiration: string
    cvv: string
}

export interface FundAccountPayload {
    amount: number
}


export default {
    ADD_CARD: (data: AddCardPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<AddCardData>('POST', `/user/billing/card`, data, options, controls),
    DELETE_CARD: (data?: null, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<boolean>('DELETE', `/user/billing/card`, data, options, controls),
    FUND_ACCOUNT: (data: FundAccountPayload, options?: NitroFetchOptions<any>, controls?: Controls) => _fetch<boolean>('POST', `/user/billing/fund-account`, data, options, controls),
}