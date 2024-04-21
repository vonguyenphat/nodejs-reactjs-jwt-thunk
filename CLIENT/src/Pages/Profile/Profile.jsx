import { useEffect, useState } from "react";
import { Spinner } from "../../Assets/Spinner";
function Profile() {
   const [isLoading, setIsLoading] = useState(true);
   useEffect(() => {
      console.log('Profile------------------------',);
      document.title = 'Profile';
      setIsLoading(false);
   }, [])
   return (
      isLoading ? <Spinner /> : <>Profile hello</>
   );
}

export default Profile;