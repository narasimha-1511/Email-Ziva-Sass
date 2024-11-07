import useThreads from '@/hooks/use-threads'
import { api } from '@/trpc/react'
import React from 'react'
import Avatar from 'react-avatar'
import Select from 'react-select'
import { useLocalStorage } from 'usehooks-ts'

type Props = {
    placeholder: string
    label: string

    onChange: (values: {label: string, value: string}[]) => void,
    value: {label: string, value: string}[]
}

const TagInput = ({label, placeholder, onChange, value}: Props) => {

    const { accountId } = useThreads();
    const {data: suggestions} = api.account.getSuggestions.useQuery({accountId});
    const [inputValue , setInputValue] = React.useState('');

    const options = suggestions?.map(suggestion => ({
        label: (
            <span className='flex items-center gap-2'>
                <Avatar 
                name={suggestion.address}
                size='25'
                textSizeRatio={2}
                round/>
                {suggestion.address}
            </span>
        ),
        value: suggestion.address
    }));

    return (
    <div className='border rounded-md flex  items-center'>
        <span className='ml-3 text-sm text-gray-500'>
            {label}
        </span>
        <Select
        onInputChange={(input) => setInputValue(input)}
        className='w-full flex-1'
        classNames={{
            control: () => {
                return '!border-none !outline-none !ring-0 !shadow-none focus:border-none focus:ring-0 focus:outline-none focus:shadow-none dark:bg-transparent [&.dark]:bg-transparent';
            },
            multiValue: () => {
                return 'dark:!bg-gray-700 [&.dark]:bg-gray-700'
            },
            multiValueLabel: () => {
                return '[&.dark]:text-white [&.dark]:bg-gray-700 dark:text-white dark:bg-gray-700 rounded-md'
            }
        }}
        value={value}
        //@ts-ignore
        onChange={onChange}
        isMulti
        placeholder={placeholder}
        //@ts-ignore
        options={inputValue ? options?.concat([
            {
                //@ts-ignore
                label: inputValue,
                value: inputValue
            }
        ]) : options}
        />
    </div>
  )
}

export default TagInput