import React from 'react'
import AddressInputPanel from 'components/AddressInputPanel'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import styled from 'styled-components'
import { ProposalAction } from './ProposalActionSelector'
import { Currency } from '@uniswap/sdk-core'

enum ProposalActionDetailField {
  ADDRESS,
  CURRENCY,
}

const _ProposalActionDetail = ({
  className,
  proposalAction,
  currency,
  amount,
  toAddress,
  onCurrencySelect,
  onAmountInput,
  onToAddressInput,
}: {
  className?: string
  proposalAction: ProposalAction
  currency: Currency | undefined
  amount: string
  toAddress: string
  onCurrencySelect: (currency: Currency) => void
  onAmountInput: (amount: string) => void
  onToAddressInput: (address: string) => void
}) => {
  const proposalActionsData = {
    [ProposalAction.TRANSFER_TOKEN]: [
      {
        type: ProposalActionDetailField.ADDRESS,
        label: 'To',
      },
      {
        type: ProposalActionDetailField.CURRENCY,
      },
    ],
    [ProposalAction.APPROVE_TOKEN]: [
      {
        type: ProposalActionDetailField.ADDRESS,
        label: 'To',
      },
      {
        type: ProposalActionDetailField.CURRENCY,
      },
    ],
  }

  return (
    <div className={className}>
      {proposalActionsData[proposalAction].map((field, i) =>
        field.type === ProposalActionDetailField.ADDRESS ? (
          <AddressInputPanel key={i} label={field.label} value={toAddress} onChange={onToAddressInput} />
        ) : field.type === ProposalActionDetailField.CURRENCY ? (
          <CurrencyInputPanel
            key={i}
            value={amount}
            currency={currency}
            onUserInput={(amount: string) => onAmountInput(amount)}
            onCurrencySelect={(currency: Currency) => onCurrencySelect(currency)}
            showMaxButton={false}
            showCommonBases={false}
            hideBalance={true}
            id="currency-input"
          />
        ) : (
          <></>
        )
      )}
    </div>
  )
}

export const ProposalActionDetail = styled(_ProposalActionDetail)`
  margin-top: 10px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 10px;
`
