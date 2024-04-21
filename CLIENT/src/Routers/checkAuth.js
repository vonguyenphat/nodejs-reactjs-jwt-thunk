function requireAuth(nextState, replace, next) {
   const authenticated = false;
   if (!authenticated) {
      replace({
         pathname: "/login",
         state: { nextPathname: nextState.location.pathname }
      });
   }
   next();
}
export default requireAuth;