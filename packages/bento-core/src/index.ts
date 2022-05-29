import { Bech32Address } from './bech32';
import {
  Chain,
  CosmosHubChain,
  EthereumChain,
  KlaytnChain,
  OsmosisChain,
  SolanaChain,
  TendermintChain,
} from './chains';
import { wallets } from './config';
import { safePromiseAll } from './utils';

/**
 * @deprecated We call each chain separately in the APIs
 */
export const main = async () => {
  const chains: Record<
    // FIXME: wow
    'ethereum' | 'klaytn' | 'solana' | 'cosmos-hub' | 'osmosis',
    Chain | TendermintChain
  > = {
    ethereum: new EthereumChain(),
    klaytn: new KlaytnChain(),
    solana: new SolanaChain(),
    'cosmos-hub': new CosmosHubChain(),
    osmosis: new OsmosisChain(),
  };

  let totalValueInUSD = 0;

  await safePromiseAll(
    wallets.map(async (wallet) => {
      if (wallet.type == 'evm') {
        await safePromiseAll(
          wallet.chains.map(async (network) => {
            if (network === 'ethereum') {
              const chain = chains[network];
              const balance = await chain.getBalance(wallet.address);
              console.log(
                `${wallet.address} has ${balance} ${chain.currency.symbol}`,
              );
              const currencyPrice = await chain.getCurrencyPrice();
              totalValueInUSD += currencyPrice * balance;
            } else if (network === 'klaytn') {
              const chain = chains[network];
              const balance = await chain.getBalance(wallet.address);
              console.log(
                `${wallet.address} has ${balance} ${chain.currency.symbol}`,
              );
              const currencyPrice = await chain.getCurrencyPrice();
              totalValueInUSD += currencyPrice * balance;
            }
          }),
        );
      } else if (wallet.type === 'solana') {
        const chain = chains[wallet.type];
        const balance = await chain.getBalance(wallet.address);
        console.log(
          `${wallet.address} has ${balance} ${chain.currency.symbol}`,
        );
        const currencyPrice = await chain.getCurrencyPrice();
        totalValueInUSD += currencyPrice * balance;
      } else if (wallet.type === 'tendermint') {
        const bech32Address = Bech32Address.fromBech32(wallet.address);

        await safePromiseAll(
          wallet.chains.map(async (chainId) => {
            const chain = chains[chainId];
            if (!('bech32Config' in chain)) {
              throw new Error(
                "Current `chain` of `chainId` does not implement `TendermintChain`'s `bech32Config`",
              );
            }
            const balance = await chain.getBalance(
              bech32Address.toBech32(chain.bech32Config.prefix),
            );
            console.log(
              `${wallet.address} has ${balance} ${chain.currency.symbol}`,
            );
            const currencyPrice = await chain.getCurrencyPrice();
            totalValueInUSD += currencyPrice * balance;
          }),
        );
      }
    }),
  );

  console.log({ totalValueInUSD: totalValueInUSD.toLocaleString() });
  return totalValueInUSD;
};