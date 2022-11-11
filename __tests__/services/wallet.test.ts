import { WalletDto, WalletEntity } from "../../src/interfaces/services/wallet.interface";
import { AppWalletService } from "../../src/services/wallet";

describe("services/wallet", () => {
    describe("method create", () => {
        it("create new wallet and result must be { id: 2, name: 'Secundária' }", async () => {
            const wallet: WalletDto = { name: "Secundária" }
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