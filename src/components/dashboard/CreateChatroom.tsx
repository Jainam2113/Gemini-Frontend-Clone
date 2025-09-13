import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { chatroomSchema, ChatroomFormData } from '@/lib/validations'
import { useChat } from '@/hooks/useChat'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'

export const CreateChatroom: React.FC = () => {
    const { createChatroom } = useChat()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<ChatroomFormData>({
        resolver: zodResolver(chatroomSchema)
    })

    const onSubmit = (data: ChatroomFormData) => {
        createChatroom(data.name)
        reset()
        setIsModalOpen(false)
    }

    return (
        <>
            <Button
                onClick={() => setIsModalOpen(true)}
                className="w-full"
                size="lg"
            >
                <Plus className="h-4 w-4 mr-2" />
                Create New Chatroom
            </Button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Create New Chatroom"
                size="sm"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <Input
                        {...register('name')}
                        label="Chatroom Name"
                        placeholder="Enter chatroom name"
                        error={errors.name?.message}
                        autoFocus
                    />

                    <div className="flex justify-end space-x-3">
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                setIsModalOpen(false)
                                reset()
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit">
                            Create
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}