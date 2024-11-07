import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { api } from '@/trpc/react'
import React from 'react'
import { useLocalStorage } from "usehooks-ts"
import { Plus } from 'lucide-react';
import { getAurinkoAuthUrl } from '@/lib/aurinko';

type Props = {
    isCollapsed: boolean,
}

const AccountSwitcher = ({ isCollapsed }: Props) => {
    
    const { data } = api.account.getAccounts.useQuery();
    const [accoutnID , setAccountId] = useLocalStorage('accountId', '')

    if(!data){
        return null;
    }

    return (
    <Select defaultValue={accoutnID} onValueChange={setAccountId}>
        <SelectTrigger className={cn(
            "flex items-center gap-w [&>span]:line-clamp-1 [&>span]:w-auto [&>span]:items-center [&>span]:truncate [&>span]:gap-1 [&>svg]:size-4 [&>svg]:shrink-0",
            isCollapsed &&
            "flex h-9 w-9 shrink-0 items-center justify-center p-0 [&>span]:w-auto [&>svg]:hidden"
        )}>
            <SelectValue placeholder="Select an account" >
                <span className={cn({'hidden' : !isCollapsed})}>
                    {
                        data.find(account => account.id === accoutnID)?.emailAddress[0]
                    }
                </span>
                <span className={cn({'hidden' : isCollapsed , 'ml-2' : true})}>
                    {
                        data.find(account => account.id === accoutnID)?.emailAddress
                    }
                </span>
            </SelectValue>
            <SelectContent>
                {data.map((account) => {
                    return (
                        <SelectItem key={account.id} value={account.id}>
                            {account.emailAddress}
                        </SelectItem>
                    )
                })}
                <div
                onClick={async () => {
                    const authUrl = await  getAurinkoAuthUrl('Google');
                    if(authUrl)
                    window.location.href = authUrl;
                }} 
                 className='flex relative hover:bg-gray-50 w-full cursor-pointer items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent'>
                    <Plus className="size-4 mr-1" />
                    Add Account
                </div>
            </SelectContent>
        </SelectTrigger>
    </Select>
  )
}

export default AccountSwitcher