function handleError(httpError: number) {
  switch (httpError) {
    case 204: {
      return <Navigate to="/204" />;
    }
    case 403: {
      return <Navigate to="/403" />;
    }
    case 404: {
      return <Navigate to="/404" />;
    }
    case 500: {
      return <Navigate to="/500" />;
    }
    default: {
      return <div>Unknown error occurred</div>;
    }
  }
}
