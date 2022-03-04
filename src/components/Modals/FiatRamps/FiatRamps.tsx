import { Modal, ModalCloseButton, ModalContent, ModalOverlay } from '@chakra-ui/modal'
import { MemoryRouter, Route } from 'react-router-dom'
import { useModal } from 'context/ModalProvider/ModalProvider'

import { FiatRampsRouter } from './FiatRampsRouter'

export enum BuySellRamp {
  Gem = 'gem',
  OnJuno = 'onjuno'
}

export enum FiatRampAction {
  Buy = 'buy',
  Sell = 'sell'
}

export enum InstitutionType {
  Coinify = 'coinify',
  Wyre = 'wyre'
}

export enum TransactionDirection {
  BankToBlockchain = 'bank_blockchain',
  CardToBlockchain = 'card_blockchain',
  BlockchainToBank = 'blockchain_bank'
}

export type CurrencyFee = {
  additional: string | null
  additional_currency: string | null
  default: boolean
  percentage: number
  subtype: string
  type: string
}

export type Medium = {
  Blockchain: 'blockchain'
  Bank: 'bank'
}

export type SupportedCurrency = {
  destination: {
    currencies: CurrencyAsset[]
    medium: Medium
    minimums?: { [x: string]: number }
  }
  fees: CurrencyFee[]
  institution_id: 'coinify' | 'wyre'
  resolved_destination_currency_count: number
  resolved_source_currency_count: number
  source: {
    currencies: CurrencyAsset[]
    medium: Medium
    minimums?: { [x: string]: number }
  }
  supported_destination_currency_count: number
  supported_source_currency_count: number
  transaction_direction: TransactionDirection
}

export type CurrencyAsset = {
  created_at: string
  external_id: string
  gem_asset_id: string
  mapping_id: string
  name: string
  primary_color: string
  rank: number
  resolved: boolean
  source: string
  ticker: string
  transaction_fields: Record<string, never>
  updated_at: string
  cryptoBalance?: number
  fiatBalance?: number
}

export enum FiatRampsRoutes {
  Select = '/fiat-ramp/select',
  Gem = '/fiat-ramp/gem'
}

export const entries = [FiatRampsRoutes.Select, FiatRampsRoutes.Gem]

export const FiatRampsModal = () => {
  const { fiatRamps } = useModal()
  const { close, isOpen } = fiatRamps
  return (
    <Modal isOpen={isOpen} onClose={close} isCentered variant='fluid'>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        <MemoryRouter initialEntries={entries}>
          <Route path='/'>
            <FiatRampsRouter />
          </Route>
        </MemoryRouter>
      </ModalContent>
    </Modal>
  )
}
