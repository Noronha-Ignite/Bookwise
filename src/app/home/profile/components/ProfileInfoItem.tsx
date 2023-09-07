import { Icon } from '@/components/core/Icons'

type ProfileInfoItemProps = {
  icon: Icon
  value: string
  label: string
}

export const ProfileInfoItem = ({
  icon: Icon,
  label,
  value,
}: ProfileInfoItemProps) => {
  return (
    <div className="flex items-center gap-5 text-green-100">
      <Icon size={32} />

      <div className="flex flex-col">
        <strong className="text-sm font-bold leading-short text-gray-200">
          {value}
        </strong>
        <span className="text-xs leading-base text-gray-300">{label}</span>
      </div>
    </div>
  )
}
