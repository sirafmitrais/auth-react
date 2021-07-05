import { Redirect, Route } from 'react-router-dom';

export default function AuthRoute({ children, ...rest }) {

    const getTimeIn = () => {
        const timeNow = new Date().getTime();
        return parseFloat((timeNow + 1) / 1000).toFixed(0);
    };

    const isAuthenticated = () => {
        const expiresIn = localStorage.getItem("expiresIn");
        if (expiresIn) {
            if (expiresIn < getTimeIn()) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    return (
      <Route {...rest} render={({ location }) => {

        return isAuthenticated() === true
          ? children
          : <Redirect to={{
                pathname: '/login',
                state: { from: location }
                }}
            />
      }} />
    )
  } 