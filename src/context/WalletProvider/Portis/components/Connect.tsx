import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { KeyManager, SUPPORTED_WALLETS } from 'context/WalletProvider/config'

import { ConnectModal } from '../../components/ConnectModal'
import { ActionTypes, useWallet, WalletActions } from '../../WalletProvider'

export interface PortisSetupProps {
  dispatch: React.Dispatch<ActionTypes>
}

// eslint-disable-next-line no-empty-pattern
export const PortisConnect = ({}: PortisSetupProps) => {
  const { dispatch, state } = useWallet()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()


  // eslint-disable-next-line no-sequences
  const setErrorLoading = (e: string | null) => (setError(e), setLoading(false))

  const pairDevice = async () => {
    setError(null)
    setLoading(true)
    if (state.adapters && state.adapters?.has(KeyManager.Portis)) {
      const wallet = await state.adapters.get(KeyManager.Portis)?.pairDevice()
      if (!wallet) {
        setErrorLoading('walletProvider.errors.walletNotFound')
        throw new Error('Call to hdwallet-portis::pairDevice returned null or undefined')
      }

      const { name, icon } = SUPPORTED_WALLETS[KeyManager.Portis]
      try {
        await wallet.initialize()

        dispatch({
          type: WalletActions.SET_WALLET,
          payload: { wallet, name, icon, deviceId: 'test' }
        })
        dispatch({ type: WalletActions.SET_IS_CONNECTED, payload: true })
        navigate('/portis/success')
      } catch (e) {
        console.error('Portis Connect: There was an error initializing the wallet', e)
        setErrorLoading('walletProvider.portis.errors.unknown')
        navigate('/portis/failure')
      }
    }
    setLoading(false)
  }

  return (
    <ConnectModal
      headerText={'walletProvider.portis.connect.header'}
      bodyText={'walletProvider.portis.connect.body'}
      buttonText={'walletProvider.portis.connect.button'}
      pairDevice={pairDevice}
      loading={loading}
      error={error}
    ></ConnectModal>
  )
}
