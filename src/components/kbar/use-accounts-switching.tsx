import useThreads from "@/hooks/use-threads"
import { api } from "@/trpc/react"
import { Action, useRegisterActions } from "kbar";
import { useLocalStorage } from "usehooks-ts";

export const useAccountsSwitching = () => {
    const { data: accounts } = api.account.getAccounts.useQuery();

    const mainAction: Action[] = [{
        id: 'accountsAction',
        name: 'Switch Account',
        shortcut: ['e', 'e'],
        section: 'Accounts',
    }]

    const [ _ , setAccount ] = useLocalStorage('accountId' , '');
    
    useRegisterActions(mainAction.concat((accounts?.map(account => {
        return {
            id: account.id,
            name: account.name,
            parent: 'accountsAction',
            perform: () => {
                setAccount(account.id)
            },
            keywords: [
                account.name,
                account.emailAddress
            ].filter(Boolean) as string[],
            shortcut: [],
            section: "Accounts",
            subtitle: account.emailAddress,
            priority: 1000
        }
    })) || [] ), [accounts])
}