import {createContext, useContext} from 'react';
import {User} from '../../domain/User';

const UserCardContext = createContext<{user: User} | null>(null);

export function useUserContext() {
  const context = useContext(UserCardContext);
  if (!context) {
    throw new Error(
      'TopicCard.* component must be rendered as child of TopicCard component!',
    );
  }
  return context;
}

export default UserCardContext;
