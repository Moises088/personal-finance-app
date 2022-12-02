import { FontAwesome5, AntDesign, MaterialCommunityIcons, Ionicons, MaterialIcons } from '@expo/vector-icons';

export const PROFILE_LIST = [
    // {
    //     title: "Minha conta",
    //     divisor: false,
    //     navigate: "MyAccountScreen",
    //     icon: (color: string, size: number) => <FontAwesome5 name="user" size={size} color={color} />
    // },
    // {
    //     title: "Backup",
    //     divisor: true,
    //     navigate: "BackupScreen",
    //     icon: (color: string, size: number) => <AntDesign name="cloudo" size={size} color={color} />
    // },
    // {
    //     title: "Dashboard",
    //     divisor: false,
    //     navigate: "DashboardSettingsScreen",
    //     icon: (color: string, size: number) => <MaterialCommunityIcons name="view-dashboard-outline" size={size} color={color} />
    // },
    // {
    //     title: "Carteiras",
    //     divisor: false,
    //     navigate: "WalletScreen",
    //     icon: (color: string, size: number) => <Ionicons name="wallet-outline" size={size} color={color} />
    // },
    {
        title: "Categorias",
        divisor: false,
        navigate: "CategoryScreen",
        icon: (color: string, size: number) => <MaterialIcons name="category" size={size} color={color} />
    },
    {
        title: "Histórico Financeiro",
        divisor: false,
        navigate: "FinanceHistoricScreen",
        icon: (color: string, size: number) => <MaterialIcons name="history" size={size} color={color} />
    },
    {
        title: "Orçamentos",
        divisor: false,
        navigate: "BudgetScreen",
        icon: (color: string, size: number) => <MaterialCommunityIcons name="finance" size={size} color={color} />
    },
    {
        title: "DebtScreen",
        divisor: false,
        navigate: "DebtScreen",
        icon: (color: string, size: number) => <MaterialCommunityIcons name="finance" size={size} color={color} />
    },
]