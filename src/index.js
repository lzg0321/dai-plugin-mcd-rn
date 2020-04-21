import assert from 'assert';
import mapValues from 'lodash/mapValues';
import reduce from 'lodash/reduce';
import uniqBy from 'lodash/uniqBy';
import { createCurrency, createCurrencyRatio } from '@makerdao/currency';
import testnetAddresses from '../contracts/addresses/testnet.json';
import kovanAddresses from '../contracts/addresses/kovan.json';
import mainnetAddresses from '../contracts/addresses/mainnet.json';
import abiMap from '../contracts/abiMap.json';
import CdpManager from './CdpManager';
import SavingsService from './SavingsService';
import CdpTypeService from './CdpTypeService';
import AuctionService from './AuctionService';
import SystemDataService from './SystemDataService';
import { ServiceRoles as ServiceRoles_ } from './constants';
import BigNumber from 'bignumber.js';

export const ServiceRoles = ServiceRoles_;
const { CDP_MANAGER, CDP_TYPE, SYSTEM_DATA, AUCTION, SAVINGS } = ServiceRoles;
const ABIJson = {
  Auction:require("../contracts/abis/Auction.json"),
  AuthGemJoin:require("../contracts/abis/AuthGemJoin.json"),
  BAT:require("../contracts/abis/BAT.json"),
  Cat:require("../contracts/abis/Cat.json"),
  ChiefUser:require("../contracts/abis/ChiefUser.json"),
  Common:require("../contracts/abis/Common.json"),
  DGD:require("../contracts/abis/DGD.json"),
  DSAuth:require("../contracts/abis/DSAuth.json"),
  DSAuthEvents:require("../contracts/abis/DSAuthEvents.json"),
  DSAuthority:require("../contracts/abis/DSAuthority.json"),
  DSChief:require("../contracts/abis/DSChief.json"),
  DSChiefApprovals:require("../contracts/abis/DSChiefApprovals.json"),
  DSGuard:require("../contracts/abis/DSGuard.json"),
  DSGuardEvents:require("../contracts/abis/DSGuardEvents.json"),
  DSGuardFactory:require("../contracts/abis/DSGuardFactory.json"),
  DSMath:require("../contracts/abis/DSMath.json"),
  DSNote:require("../contracts/abis/DSNote.json"),
  DSPause:require("../contracts/abis/DSPause.json"),
  DSPauseProxy:require("../contracts/abis/DSPauseProxy.json"),
  DSProxy:require("../contracts/abis/DSProxy.json"),
  DSProxyCache:require("../contracts/abis/DSProxyCache.json"),
  DSProxyFactory:require("../contracts/abis/DSProxyFactory.json"),
  DSRoles:require("../contracts/abis/DSRoles.json"),
  DSStop:require("../contracts/abis/DSStop.json"),
  DSThing:require("../contracts/abis/DSThing.json"),
  DSToken:require("../contracts/abis/DSToken.json"),
  DSTokenBase:require("../contracts/abis/DSTokenBase.json"),
  DSValue:require("../contracts/abis/DSValue.json"),
  Dai:require("../contracts/abis/Dai.json"),
  DaiJoin:require("../contracts/abis/DaiJoin.json"),
  DssCdpManager:require("../contracts/abis/DssCdpManager.json"),
  DssDeploy:require("../contracts/abis/DssDeploy.json"),
  DssDeployPauseProxyActions:require("../contracts/abis/DssDeployPauseProxyActions.json"),
  DssProxyActions:require("../contracts/abis/DssProxyActions.json"),
  DssProxyActionsDsr:require("../contracts/abis/DssProxyActionsDsr.json"),
  DssProxyActionsEnd:require("../contracts/abis/DssProxyActionsEnd.json"),
  ERC20:require("../contracts/abis/ERC20.json"),
  ERC20Events:require("../contracts/abis/ERC20Events.json"),
  ESM:require("../contracts/abis/ESM.json"),
  ETHJoin:require("../contracts/abis/ETHJoin.json"),
  End:require("../contracts/abis/End.json"),
  FakeUser:require("../contracts/abis/FakeUser.json"),
  FaucetUser:require("../contracts/abis/FaucetUser.json"),
  Flapper:require("../contracts/abis/Flapper.json"),
  Flipper:require("../contracts/abis/Flipper.json"),
  Flippy:require("../contracts/abis/Flippy.json"),
  Flopper:require("../contracts/abis/Flopper.json"),
  Fusspot:require("../contracts/abis/Fusspot.json"),
  GNT:require("../contracts/abis/GNT.json"),
  GemBag:require("../contracts/abis/GemBag.json"),
  GemJoin:require("../contracts/abis/GemJoin.json"),
  GemJoin1:require("../contracts/abis/GemJoin1.json"),
  GemJoin2:require("../contracts/abis/GemJoin2.json"),
  GemJoin3:require("../contracts/abis/GemJoin3.json"),
  GemJoin4:require("../contracts/abis/GemJoin4.json"),
  GemPit:require("../contracts/abis/GemPit.json"),
  GetCdps:require("../contracts/abis/GetCdps.json"),
  GovActions:require("../contracts/abis/GovActions.json"),
  GovPollingGenerator:require("../contracts/abis/GovPollingGenerator.json"),
  Hevm:require("../contracts/abis/Hevm.json"),
  Hopeful:require("../contracts/abis/Hopeful.json"),
  Jug:require("../contracts/abis/Jug.json"),
  Kicker:require("../contracts/abis/Kicker.json"),
  LibNote:require("../contracts/abis/LibNote.json"),
  Median:require("../contracts/abis/Median.json"),
  MigrationProxyActions:require("../contracts/abis/MigrationProxyActions.json"),
  MkrAuthority:require("../contracts/abis/MkrAuthority.json"),
  MockOtc:require("../contracts/abis/MockOtc.json"),
  MockSaiPip:require("../contracts/abis/MockSaiPip.json"),
  MultiCall:require("../contracts/abis/MultiCall.json"),
  MulticallHelper:require("../contracts/abis/MulticallHelper.json"),
  OMG:require("../contracts/abis/OMG.json"),
  OSM:require("../contracts/abis/OSM.json"),
  OwnerUpdate:require("../contracts/abis/OwnerUpdate.json"),
  Plan:require("../contracts/abis/Plan.json"),
  Pot:require("../contracts/abis/Pot.json"),
  ProxyActions:require("../contracts/abis/ProxyActions.json"),
  ProxyCalls:require("../contracts/abis/ProxyCalls.json"),
  ProxyRegistry:require("../contracts/abis/ProxyRegistry.json"),
  REP:require("../contracts/abis/REP.json"),
  RestrictedTokenFaucet:require("../contracts/abis/RestrictedTokenFaucet.json"),
  SaiMom:require("../contracts/abis/SaiMom.json"),
  SaiTap:require("../contracts/abis/SaiTap.json"),
  SaiTop:require("../contracts/abis/SaiTop.json"),
  SaiTub:require("../contracts/abis/SaiTub.json"),
  SaiTubEvents:require("../contracts/abis/SaiTubEvents.json"),
  SaiVox:require("../contracts/abis/SaiVox.json"),
  ScdMcdMigration:require("../contracts/abis/ScdMcdMigration.json"),
  Setter:require("../contracts/abis/Setter.json"),
  Spotter:require("../contracts/abis/Spotter.json"),
  Spotty:require("../contracts/abis/Spotty.json"),
  Store:require("../contracts/abis/Store.json"),
  Token1:require("../contracts/abis/Token1.json"),
  Token2:require("../contracts/abis/Token2.json"),
  Token3:require("../contracts/abis/Token3.json"),
  Token4:require("../contracts/abis/Token4.json"),
  Token5:require("../contracts/abis/Token5.json"),
  Token6:require("../contracts/abis/Token6.json"),
  TokenFaucet:require("../contracts/abis/TokenFaucet.json"),
  USDC:require("../contracts/abis/USDC.json"),
  UrnHandler:require("../contracts/abis/UrnHandler.json"),
  User:require("../contracts/abis/User.json"),
  Utils:require("../contracts/abis/Utils.json"),
  Value:require("../contracts/abis/Value.json"),
  Vat:require("../contracts/abis/Vat.json"),
  VoteNo:require("../contracts/abis/VoteNo.json"),
  VoteProxy:require("../contracts/abis/VoteProxy.json"),
  VoteProxyFactory:require("../contracts/abis/VoteProxyFactory.json"),
  VoteUser:require("../contracts/abis/VoteUser.json"),
  VoteYes:require("../contracts/abis/VoteYes.json"),
  Voter:require("../contracts/abis/Voter.json"),
  Vow:require("../contracts/abis/Vow.json"),
  WETH9:require("../contracts/abis/WETH9.json"),
  WETH9_:require("../contracts/abis/WETH9_.json"),
  ZRX:require("../contracts/abis/ZRX.json")
};
// look up contract ABIs using abiMap.
// if an exact match is not found, prefix-match against keys ending in *, e.g.
// MCD_JOIN_ETH_B matches MCD_JOIN_*
// this implementation assumes that all contracts in kovan.json are also in testnet.json
let addContracts = reduce(
  testnetAddresses,
  (result, testnetAddress, name) => {
    let abiName = abiMap[name];
    if (!abiName) {
      const prefix = Object.keys(abiMap).find(
        k =>
          k.substring(k.length - 1) == '*' &&
          k.substring(0, k.length - 1) == name.substring(0, k.length - 1)
      );
      if (prefix) abiName = abiMap[prefix];
    }
    if (abiName) {
      result[name] = {
        abi: ABIJson[abiName],
        address: {
          testnet: testnetAddress,
          kovan: kovanAddresses[name],
          mainnet: mainnetAddresses[name]
        }
      };
    }
    return result;
  },
  {}
);

export const ETH = createCurrency('ETH');
export const MKR = createCurrency('MKR');
export const USD = createCurrency('USD');
export const USD_ETH = createCurrencyRatio(USD, ETH);

// these are prefixed with M so that they don't override their SCD versions--
// otherwise, adding the MCD plugin would break MCD. maybe there's a better way
// to work around this?
export const MWETH = createCurrency('MWETH');
export const MDAI = createCurrency('MDAI');

// Casting for savings dai
export const DSR_DAI = createCurrency('DSR-DAI');

export const REP = createCurrency('REP');
export const ZRX = createCurrency('ZRX');
export const OMG = createCurrency('OMG');
export const BAT = createCurrency('BAT');
export const DGD = createCurrency('DGD');
export const GNT = createCurrency('GNT');
export const USDC = createCurrency('USDC');

export const defaultCdpTypes = [
  { currency: ETH, ilk: 'ETH-A' },
  { currency: BAT, ilk: 'BAT-A' },
  { currency: USDC, ilk: 'USDC-A', decimals: 6 }
];

export const SAI = createCurrency('SAI');

export const ALLOWANCE_AMOUNT = BigNumber(
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
);

export const defaultTokens = [
  ...new Set([
    ...defaultCdpTypes.map(type => type.currency),
    MDAI,
    MWETH,
    SAI,
    DSR_DAI
  ])
];

export const McdPlugin = {
  addConfig: (
    _,
    { cdpTypes = defaultCdpTypes, addressOverrides, prefetch = true } = {}
  ) => {
    if (addressOverrides) {
      addContracts = mapValues(addContracts, (contractDetails, name) => ({
        ...contractDetails,
        address: addressOverrides[name] || contractDetails.address
      }));
    }
    const tokens = uniqBy(cdpTypes, 'currency').map(
      ({ currency, address, abi, decimals }) => {
        const data =
          address && abi ? { address, abi } : addContracts[currency.symbol];
        assert(data, `No address and ABI found for "${currency.symbol}"`);
        return {
          currency,
          abi: data.abi,
          address: data.address,
          decimals: data.decimals || decimals
        };
      }
    );

    // Set global BigNumber precision to enable exponential operations
    BigNumber.config({ POW_PRECISION: 100 });

    return {
      smartContract: { addContracts },
      token: {
        erc20: [
          { currency: MDAI, address: addContracts.MCD_DAI.address },
          { currency: MWETH, address: addContracts.ETH.address },
          ...tokens
        ]
      },
      additionalServices: [
        CDP_MANAGER,
        CDP_TYPE,
        AUCTION,
        SYSTEM_DATA,
        SAVINGS
      ],
      [CDP_TYPE]: [CdpTypeService, { cdpTypes, prefetch }],
      [CDP_MANAGER]: CdpManager,
      [SAVINGS]: SavingsService,
      [AUCTION]: AuctionService,
      [SYSTEM_DATA]: SystemDataService
    };
  }
};

export default McdPlugin;
