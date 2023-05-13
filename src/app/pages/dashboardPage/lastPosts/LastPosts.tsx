import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { faNewspaper } from '@fortawesome/free-solid-svg-icons';

import { usePosts } from '../../../../store/posts/postsSlice';
import { SidebarSection } from '../../../../components/sidebarSection/SidebarSection';
import { route } from '../../../appRouter/AppRouter';

export const LastPosts: React.FC = () => {

    const posts = usePosts();

    return (
        <SidebarSection
            title="Últimos Posts"
            icon={faNewspaper}
            className="overflow-hidden"
            bodyClass="p-0 text-secondary"
        >
            {posts.lastPosts.map((post, index) => (
                <div key={index} className={clsx('p-2', index % 2 == 0 ? 'bg-white' : 'bg-light')}>
                    <h6 className="mb-0">
                        » <Link to={route('showPost', { postname: post.postname })}>{post.title}</Link>
                    </h6>

                    <small>
                        {post.createdAtFormatted} por
                        {' '}
                        <Link
                            to={route('userProfile', { username: post.user.username })}
                            className="link-secondary fw-bold"
                        >
                            {post.user.name}
                        </Link>
                    </small>
                </div>
            ))}

            {posts.lastPosts.length == 0 ? (
                <div className="text-center fw-bold p-3">
                    Ainda não há posts para exibir
                </div>
            ) : null}
        </SidebarSection>
    );
};
