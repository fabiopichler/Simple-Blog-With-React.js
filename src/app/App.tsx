import { useEffect } from 'react';

import { AppRouter } from './appRouter/AppRouter';
import { Loading } from '../components/loading/Loading';

import { useAppDispatch } from '../store/hooks';
import { initAuth, useAuth } from '../store/auth/authSlice';
import { fetchLastPosts } from '../store/posts/postsSlice';

export const App: React.FC = () => {
    const auth = useAuth();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initAuth());
        dispatch(fetchLastPosts());
    }, []);

    if (auth.loading)
        return <Loading />;

    return <AppRouter />;
}
