import { twMerge } from 'tailwind-merge'

import { Avatar } from '@/components/core/Avatar'
import { getSocialName } from '@/utils/string'
import dayjs from 'dayjs'
import {
  BookOpen,
  Books,
  UserList,
  BookmarkSimple,
} from '@/components/core/Icons'
import { ProfileInfoItem } from './ProfileInfoItem'

type ProfileInfoProps = {
  user: User
  details: UserDetails
}

export const ProfileInfo = ({ user, details }: ProfileInfoProps) => {
  return (
    <section className="flex h-fit flex-col gap-10 border-gray-700 md:border-l">
      <header className="flex flex-col items-center">
        <Avatar src={user.avatar_url ?? ''} alt={user.name} size={72} />
        <h3 className="mt-5 text-lg font-bold leading-short">
          {getSocialName(user.name)}
        </h3>
        <span className="text-xs leading-base text-gray-400 ">
          membro desde {dayjs(user.created_at).year()}
        </span>
      </header>

      <div
        className={twMerge(
          'relative flex flex-col gap-10 px-14 py-13',
          'before:absolute before:left-1/2 before:top-0 before:h-1 before:w-8 before:-translate-x-1/2 before:rounded-full before:bg-gradient-horizontal',
        )}
      >
        <ProfileInfoItem
          icon={BookOpen}
          label="Páginas lidas"
          value={details.totalReadPages.toString()}
        />
        <ProfileInfoItem
          icon={Books}
          label="Livros avaliados"
          value={details.totalRatedBooks.toString()}
        />
        <ProfileInfoItem
          icon={UserList}
          label="Autores lidos"
          value={details.totalAuthorsRead.toString()}
        />
        <ProfileInfoItem
          icon={BookmarkSimple}
          label="Categoria mais lida"
          value={details.mostReadCategory}
        />
      </div>
    </section>
  )
}
