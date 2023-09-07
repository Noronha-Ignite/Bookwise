import { Icon as IIcon } from './Icons'

type NoItemFoundProps = {
  icon?: IIcon

  title: string
  subtitle?: string
}

export const NoItemFound = ({
  icon: Icon,
  title,
  subtitle,
}: NoItemFoundProps) => {
  return (
    <div className="mt-16 flex flex-col items-center gap-1 text-green-100">
      {Icon && <Icon size={32} />}

      <strong className="mt-4 text-center text-lg text-gray-200">
        {title}
      </strong>
      {subtitle && (
        <span className="text-center text-md text-gray-400">{subtitle}</span>
      )}
    </div>
  )
}
