import { WalletDto, WalletEntity } from "../../src/interfaces/services/wallet.interface";
import { AppWalletService } from "../../src/services/wallet";

const mockWallets: WalletEntity[] = [
    { name: 'Principal', id: 1 }
]

describe("services/wallet", () => {
    describe("method create", () => {
        it("create new wallet and result must be { id: 2, name: 'Secundária' }", async () => {
            const wallet: WalletDto = { name: "Secundária" }
            const newWallet = AppWalletService.onCreateWallet(mockWallets, wallet);
            expect(newWallet.wallet).toEqual({ id: 2, name: 'Secundária' })
        })

        it("create same wallet and result must be Error 'Carteira já criada'", async () => {
            const wallet: WalletDto = { name: 'Principal' }
            const error = () => {
                AppWalletService.onCreateWallet(mockWallets, wallet)
            }
            expect(error).toThrow(Error('Carteira já criada'));
        })
    })
})