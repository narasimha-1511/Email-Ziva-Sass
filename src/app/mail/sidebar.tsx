import React from 'react'
import { useLocalStorage } from 'usehooks-ts'
import { Nav } from './nav'
import { DraftingCompass, File, GitPullRequestDraft, InboxIcon, Send, SendIcon, StarIcon, Trash } from 'lucide-react'
import { api } from '@/trpc/react'

type Props = {
    isCollapsed: boolean
}

const Sidebar = ({ isCollapsed }: Props) => {
    const [accountId] = useLocalStorage('accountId', '')
    const [tab] = useLocalStorage<'inbox' | 'draft' | 'sent'>('sidebar-tab', 'inbox')

    const { data : InboxThreads } = api.account.getNumThreads.useQuery({ accountId , tab : 'inbox'});
    const { data : DraftThreads } = api.account.getNumThreads.useQuery({ accountId , tab : 'draft'});
    const { data : SentThreads } = api.account.getNumThreads.useQuery({ accountId , tab : 'sent'});
  
    return (
    <div>
        <Nav 
        isCollapsed={isCollapsed}
        links={[
            {
                title: 'Inbox',
                label: InboxThreads?.toString() ?? '0',
                icon: InboxIcon,
                variant: tab==='inbox' ? 'default' : 'ghost'
            },
            // {
            //     title: 'Starred',
            //     label: '2',
            //     icon: StarIcon,
            //     variant: 'ghost'
            // },
            {
                title: 'Draft',
                label: DraftThreads?.toString() ?? '0',
                icon: File,
                variant: tab==='draft' ? 'default' : 'ghost'
            },
            {
                title: 'Sent',
                label: SentThreads?.toString() ?? '0',
                icon: Send,
                variant: tab==='sent' ? 'default' : 'ghost'
            }
        ]}
        />
    </div>
  )
}

export default Sidebar