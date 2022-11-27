import { WalletDto, WalletEntity } from "../../src/interfaces/services/wallet.interface";
import { AppWalletService } from "../../src/services/wallet";
import { AsyncMock } from "../../__mocks__/asynstorage.mock";

const wallet: WalletDto = { name: "Secundária" };
const sameWallet: WalletDto = AsyncMock['ASYNC_WALLETS'][0];

describe("services/wallet", () => {
    describe("method find", () => {
        it("find wallets and result must be WalletDto array", async () => {
            const wallets = await AppWalletService.find();
            expect(wallets).toEqual(
                expect.arrayContaining([
                    expect.objectContaining({ ...sameWallet, id: 1 })
                ])
            )
        })
    })

    describe("method findOne", () => {
        it("find where id = 1 result must be WalletDto", async () => {
            const wallet = await AppWalletService.findOne(1);
            expect(wallet).toEqual({ ...sameWallet, id: 1 })
        })

        it("find where id = 2 result must be undefined", async () => {
            const wallet = await AppWalletService.findOne(2);
            expect(wallet).toBeUndefined()
        })
    })

    describe("method create", () => {
        it("create new wallet and result must be { id: 2, name: 'Secundária' }", async () => {
            const newWallet = await AppWalletService.create(wallet);
            expect(newWallet).toEqual({ id: 2, name: 'Secundária' });
        })

        it("create same wallet and result must be Error 'Carteira já criada'", async () => {
            const wallet: WalletDto = { name: 'Principal' }
            AppWalletService.create(wallet).catch(error => {
                expect(error).toThrow(Error('Carteira já criada'));
            });
        })
    })
})