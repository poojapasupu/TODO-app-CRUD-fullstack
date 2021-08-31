import React from "react";
import { useParams, Link} from "react-router-dom";

const Welcome = (props) => {
  const params = useParams();

  return (
    <div>
    {/* <Route path={match.path} exact> 
      <h1>Welcome {params.name}!</h1>
      <Link to={`${match.url}/todos`}>Todos</Link>
      </Route>

      <Route path={`${match.path}/todos`} >
        <Todos/>
      </Route> */}
      <h1>Welcome {params.name}!</h1>
      <Link to='/todos'>Todos</Link>

    </div>
  );
};

export default Welcome;
