"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.McdPlugin = exports.defaultTokens = exports.ALLOWANCE_AMOUNT = exports.SAI = exports.defaultCdpTypes = exports.USDC = exports.GNT = exports.DGD = exports.BAT = exports.OMG = exports.ZRX = exports.REP = exports.DSR_DAI = exports.MDAI = exports.MWETH = exports.USD_ETH = exports.USD = exports.MKR = exports.ETH = exports.ServiceRoles = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _assert = _interopRequireDefault(require("assert"));

var _mapValues = _interopRequireDefault(require("lodash/mapValues"));

var _reduce = _interopRequireDefault(require("lodash/reduce"));

var _uniqBy = _interopRequireDefault(require("lodash/uniqBy"));

var _currency = require("@makerdao/currency");

var _testnet = _interopRequireDefault(require("../contracts/addresses/testnet.json"));

var _kovan = _interopRequireDefault(require("../contracts/addresses/kovan.json"));

var _mainnet = _interopRequireDefault(require("../contracts/addresses/mainnet.json"));

var _abiMap = _interopRequireDefault(require("../contracts/abiMap.json"));

var _CdpManager = _interopRequireDefault(require("./CdpManager"));

var _SavingsService = _interopRequireDefault(require("./SavingsService"));

var _CdpTypeService = _interopRequireDefault(require("./CdpTypeService"));

var _AuctionService = _interopRequireDefault(require("./AuctionService"));

var _SystemDataService = _interopRequireDefault(require("./SystemDataService"));

var _constants = require("./constants");

var _bignumber = _interopRequireDefault(require("bignumber.js"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var ServiceRoles = _constants.ServiceRoles;
exports.ServiceRoles = ServiceRoles;
var CDP_MANAGER = ServiceRoles.CDP_MANAGER,
    CDP_TYPE = ServiceRoles.CDP_TYPE,
    SYSTEM_DATA = ServiceRoles.SYSTEM_DATA,
    AUCTION = ServiceRoles.AUCTION,
    SAVINGS = ServiceRoles.SAVINGS;
var ABIJson = {
  Auction: require("../contracts/abis/Auction.json"),
  AuthGemJoin: require("../contracts/abis/AuthGemJoin.json"),
  BAT: require("../contracts/abis/BAT.json"),
  Cat: require("../contracts/abis/Cat.json"),
  ChiefUser: require("../contracts/abis/ChiefUser.json"),
  Common: require("../contracts/abis/Common.json"),
  DGD: require("../contracts/abis/DGD.json"),
  DSAuth: require("../contracts/abis/DSAuth.json"),
  DSAuthEvents: require("../contracts/abis/DSAuthEvents.json"),
  DSAuthority: require("../contracts/abis/DSAuthority.json"),
  DSChief: require("../contracts/abis/DSChief.json"),
  DSChiefApprovals: require("../contracts/abis/DSChiefApprovals.json"),
  DSGuard: require("../contracts/abis/DSGuard.json"),
  DSGuardEvents: require("../contracts/abis/DSGuardEvents.json"),
  DSGuardFactory: require("../contracts/abis/DSGuardFactory.json"),
  DSMath: require("../contracts/abis/DSMath.json"),
  DSNote: require("../contracts/abis/DSNote.json"),
  DSPause: require("../contracts/abis/DSPause.json"),
  DSPauseProxy: require("../contracts/abis/DSPauseProxy.json"),
  DSProxy: require("../contracts/abis/DSProxy.json"),
  DSProxyCache: require("../contracts/abis/DSProxyCache.json"),
  DSProxyFactory: require("../contracts/abis/DSProxyFactory.json"),
  DSRoles: require("../contracts/abis/DSRoles.json"),
  DSStop: require("../contracts/abis/DSStop.json"),
  DSThing: require("../contracts/abis/DSThing.json"),
  DSToken: require("../contracts/abis/DSToken.json"),
  DSTokenBase: require("../contracts/abis/DSTokenBase.json"),
  DSValue: require("../contracts/abis/DSValue.json"),
  Dai: require("../contracts/abis/Dai.json"),
  DaiJoin: require("../contracts/abis/DaiJoin.json"),
  DssCdpManager: require("../contracts/abis/DssCdpManager.json"),
  DssDeploy: require("../contracts/abis/DssDeploy.json"),
  DssDeployPauseProxyActions: require("../contracts/abis/DssDeployPauseProxyActions.json"),
  DssProxyActions: require("../contracts/abis/DssProxyActions.json"),
  DssProxyActionsDsr: require("../contracts/abis/DssProxyActionsDsr.json"),
  DssProxyActionsEnd: require("../contracts/abis/DssProxyActionsEnd.json"),
  ERC20: require("../contracts/abis/ERC20.json"),
  ERC20Events: require("../contracts/abis/ERC20Events.json"),
  ESM: require("../contracts/abis/ESM.json"),
  ETHJoin: require("../contracts/abis/ETHJoin.json"),
  End: require("../contracts/abis/End.json"),
  FakeUser: require("../contracts/abis/FakeUser.json"),
  FaucetUser: require("../contracts/abis/FaucetUser.json"),
  Flapper: require("../contracts/abis/Flapper.json"),
  Flipper: require("../contracts/abis/Flipper.json"),
  Flippy: require("../contracts/abis/Flippy.json"),
  Flopper: require("../contracts/abis/Flopper.json"),
  Fusspot: require("../contracts/abis/Fusspot.json"),
  GNT: require("../contracts/abis/GNT.json"),
  GemBag: require("../contracts/abis/GemBag.json"),
  GemJoin: require("../contracts/abis/GemJoin.json"),
  GemJoin1: require("../contracts/abis/GemJoin1.json"),
  GemJoin2: require("../contracts/abis/GemJoin2.json"),
  GemJoin3: require("../contracts/abis/GemJoin3.json"),
  GemJoin4: require("../contracts/abis/GemJoin4.json"),
  GemPit: require("../contracts/abis/GemPit.json"),
  GetCdps: require("../contracts/abis/GetCdps.json"),
  GovActions: require("../contracts/abis/GovActions.json"),
  GovPollingGenerator: require("../contracts/abis/GovPollingGenerator.json"),
  Hevm: require("../contracts/abis/Hevm.json"),
  Hopeful: require("../contracts/abis/Hopeful.json"),
  Jug: require("../contracts/abis/Jug.json"),
  Kicker: require("../contracts/abis/Kicker.json"),
  LibNote: require("../contracts/abis/LibNote.json"),
  Median: require("../contracts/abis/Median.json"),
  MigrationProxyActions: require("../contracts/abis/MigrationProxyActions.json"),
  MkrAuthority: require("../contracts/abis/MkrAuthority.json"),
  MockOtc: require("../contracts/abis/MockOtc.json"),
  MockSaiPip: require("../contracts/abis/MockSaiPip.json"),
  MultiCall: require("../contracts/abis/MultiCall.json"),
  MulticallHelper: require("../contracts/abis/MulticallHelper.json"),
  OMG: require("../contracts/abis/OMG.json"),
  OSM: require("../contracts/abis/OSM.json"),
  OwnerUpdate: require("../contracts/abis/OwnerUpdate.json"),
  Plan: require("../contracts/abis/Plan.json"),
  Pot: require("../contracts/abis/Pot.json"),
  ProxyActions: require("../contracts/abis/ProxyActions.json"),
  ProxyCalls: require("../contracts/abis/ProxyCalls.json"),
  ProxyRegistry: require("../contracts/abis/ProxyRegistry.json"),
  REP: require("../contracts/abis/REP.json"),
  RestrictedTokenFaucet: require("../contracts/abis/RestrictedTokenFaucet.json"),
  SaiMom: require("../contracts/abis/SaiMom.json"),
  SaiTap: require("../contracts/abis/SaiTap.json"),
  SaiTop: require("../contracts/abis/SaiTop.json"),
  SaiTub: require("../contracts/abis/SaiTub.json"),
  SaiTubEvents: require("../contracts/abis/SaiTubEvents.json"),
  SaiVox: require("../contracts/abis/SaiVox.json"),
  ScdMcdMigration: require("../contracts/abis/ScdMcdMigration.json"),
  Setter: require("../contracts/abis/Setter.json"),
  Spotter: require("../contracts/abis/Spotter.json"),
  Spotty: require("../contracts/abis/Spotty.json"),
  Store: require("../contracts/abis/Store.json"),
  Token1: require("../contracts/abis/Token1.json"),
  Token2: require("../contracts/abis/Token2.json"),
  Token3: require("../contracts/abis/Token3.json"),
  Token4: require("../contracts/abis/Token4.json"),
  Token5: require("../contracts/abis/Token5.json"),
  Token6: require("../contracts/abis/Token6.json"),
  TokenFaucet: require("../contracts/abis/TokenFaucet.json"),
  USDC: require("../contracts/abis/USDC.json"),
  UrnHandler: require("../contracts/abis/UrnHandler.json"),
  User: require("../contracts/abis/User.json"),
  Utils: require("../contracts/abis/Utils.json"),
  Value: require("../contracts/abis/Value.json"),
  Vat: require("../contracts/abis/Vat.json"),
  VoteNo: require("../contracts/abis/VoteNo.json"),
  VoteProxy: require("../contracts/abis/VoteProxy.json"),
  VoteProxyFactory: require("../contracts/abis/VoteProxyFactory.json"),
  VoteUser: require("../contracts/abis/VoteUser.json"),
  VoteYes: require("../contracts/abis/VoteYes.json"),
  Voter: require("../contracts/abis/Voter.json"),
  Vow: require("../contracts/abis/Vow.json"),
  WETH9: require("../contracts/abis/WETH9.json"),
  WETH9_: require("../contracts/abis/WETH9_.json"),
  ZRX: require("../contracts/abis/ZRX.json")
}; // look up contract ABIs using abiMap.
// if an exact match is not found, prefix-match against keys ending in *, e.g.
// MCD_JOIN_ETH_B matches MCD_JOIN_*
// this implementation assumes that all contracts in kovan.json are also in testnet.json

var addContracts = (0, _reduce["default"])(_testnet["default"], function (result, testnetAddress, name) {
  var abiName = _abiMap["default"][name];

  if (!abiName) {
    var prefix = Object.keys(_abiMap["default"]).find(function (k) {
      return k.substring(k.length - 1) == '*' && k.substring(0, k.length - 1) == name.substring(0, k.length - 1);
    });
    if (prefix) abiName = _abiMap["default"][prefix];
  }

  if (abiName) {
    result[name] = {
      abi: ABIJson[abiName],
      address: {
        testnet: testnetAddress,
        kovan: _kovan["default"][name],
        mainnet: _mainnet["default"][name]
      }
    };
  }

  return result;
}, {});
var ETH = (0, _currency.createCurrency)('ETH');
exports.ETH = ETH;
var MKR = (0, _currency.createCurrency)('MKR');
exports.MKR = MKR;
var USD = (0, _currency.createCurrency)('USD');
exports.USD = USD;
var USD_ETH = (0, _currency.createCurrencyRatio)(USD, ETH); // these are prefixed with M so that they don't override their SCD versions--
// otherwise, adding the MCD plugin would break MCD. maybe there's a better way
// to work around this?

exports.USD_ETH = USD_ETH;
var MWETH = (0, _currency.createCurrency)('MWETH');
exports.MWETH = MWETH;
var MDAI = (0, _currency.createCurrency)('MDAI'); // Casting for savings dai

exports.MDAI = MDAI;
var DSR_DAI = (0, _currency.createCurrency)('DSR-DAI');
exports.DSR_DAI = DSR_DAI;
var REP = (0, _currency.createCurrency)('REP');
exports.REP = REP;
var ZRX = (0, _currency.createCurrency)('ZRX');
exports.ZRX = ZRX;
var OMG = (0, _currency.createCurrency)('OMG');
exports.OMG = OMG;
var BAT = (0, _currency.createCurrency)('BAT');
exports.BAT = BAT;
var DGD = (0, _currency.createCurrency)('DGD');
exports.DGD = DGD;
var GNT = (0, _currency.createCurrency)('GNT');
exports.GNT = GNT;
var USDC = (0, _currency.createCurrency)('USDC');
exports.USDC = USDC;
var defaultCdpTypes = [{
  currency: ETH,
  ilk: 'ETH-A'
}, {
  currency: BAT,
  ilk: 'BAT-A'
}, {
  currency: USDC,
  ilk: 'USDC-A',
  decimals: 6
}];
exports.defaultCdpTypes = defaultCdpTypes;
var SAI = (0, _currency.createCurrency)('SAI');
exports.SAI = SAI;
var ALLOWANCE_AMOUNT = (0, _bignumber["default"])('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
exports.ALLOWANCE_AMOUNT = ALLOWANCE_AMOUNT;
var defaultTokens = (0, _toConsumableArray2["default"])(new Set([].concat((0, _toConsumableArray2["default"])(defaultCdpTypes.map(function (type) {
  return type.currency;
})), [MDAI, MWETH, SAI, DSR_DAI])));
exports.defaultTokens = defaultTokens;
var McdPlugin = {
  addConfig: function addConfig(_) {
    var _ref3;

    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$cdpTypes = _ref.cdpTypes,
        cdpTypes = _ref$cdpTypes === void 0 ? defaultCdpTypes : _ref$cdpTypes,
        addressOverrides = _ref.addressOverrides,
        _ref$prefetch = _ref.prefetch,
        prefetch = _ref$prefetch === void 0 ? true : _ref$prefetch;

    if (addressOverrides) {
      addContracts = (0, _mapValues["default"])(addContracts, function (contractDetails, name) {
        return _objectSpread({}, contractDetails, {
          address: addressOverrides[name] || contractDetails.address
        });
      });
    }

    var tokens = (0, _uniqBy["default"])(cdpTypes, 'currency').map(function (_ref2) {
      var currency = _ref2.currency,
          address = _ref2.address,
          abi = _ref2.abi,
          decimals = _ref2.decimals;
      var data = address && abi ? {
        address: address,
        abi: abi
      } : addContracts[currency.symbol];
      (0, _assert["default"])(data, "No address and ABI found for \"".concat(currency.symbol, "\""));
      return {
        currency: currency,
        abi: data.abi,
        address: data.address,
        decimals: data.decimals || decimals
      };
    }); // Set global BigNumber precision to enable exponential operations

    _bignumber["default"].config({
      POW_PRECISION: 100
    });

    return _ref3 = {
      smartContract: {
        addContracts: addContracts
      },
      token: {
        erc20: [{
          currency: MDAI,
          address: addContracts.MCD_DAI.address
        }, {
          currency: MWETH,
          address: addContracts.ETH.address
        }].concat((0, _toConsumableArray2["default"])(tokens))
      },
      additionalServices: [CDP_MANAGER, CDP_TYPE, AUCTION, SYSTEM_DATA, SAVINGS]
    }, (0, _defineProperty2["default"])(_ref3, CDP_TYPE, [_CdpTypeService["default"], {
      cdpTypes: cdpTypes,
      prefetch: prefetch
    }]), (0, _defineProperty2["default"])(_ref3, CDP_MANAGER, _CdpManager["default"]), (0, _defineProperty2["default"])(_ref3, SAVINGS, _SavingsService["default"]), (0, _defineProperty2["default"])(_ref3, AUCTION, _AuctionService["default"]), (0, _defineProperty2["default"])(_ref3, SYSTEM_DATA, _SystemDataService["default"]), _ref3;
  }
};
exports.McdPlugin = McdPlugin;
var _default = McdPlugin;
exports["default"] = _default;