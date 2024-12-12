import { ErrorBoundary } from 'react-error-boundary';
// import UploadImages from "./components/uploadImages";
// import FetchImage from "./components/fetchImage";
import NavBar from "./components/navBar";
import FetchImage from './components/fetchImage';
import UploadImages from './components/uploadImages';
import DataBase from './dataBase';
// import Card from './components/card';

const ErrorFallback = ({ error }: { error: Error }) => {
  return (
    <div className="text-red-500 p-4">
      <h2>Something went wrong:</h2>
      <pre>{error.message}</pre>
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="h-auto w-full bg-zinc-800">
        <NavBar />
        <UploadImages />
        <FetchImage />
        <DataBase />


      </div>
    </ErrorBoundary>
  );
};

export default App;
