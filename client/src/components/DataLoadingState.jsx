import { getApiErrorMessage, isServerWakingUp } from '../utils/apiClient';

const WAKE_UP_HINT =
  'If you have not visited in a while, the free server may be waking up. This can take up to a minute on the first load.';

export function EventGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {Array.from({ length: 8 }).map((_, index) => (
        <div
          key={index}
          className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden"
        >
          <div className="skeleton w-full h-48" />
          <div className="skeleton w-full h-24" />
        </div>
      ))}
    </div>
  );
}

export function TableRowsSkeleton({ rows = 5 }) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <tr key={index}>
          <td>
            <div className="skeleton h-4 w-32" />
          </td>
          <td>
            <div className="skeleton h-4 w-40" />
          </td>
          <td>
            <div className="skeleton h-4 w-24" />
          </td>
          <td>
            <div className="skeleton h-4 w-28" />
          </td>
          <td>
            <div className="skeleton h-6 w-6 rounded" />
          </td>
        </tr>
      ))}
    </>
  );
}

export function EventCardsSkeleton() {
  return (
    <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
      {Array.from({ length: 2 }).map((_, index) => (
        <div
          key={index}
          className="card bg-white shadow-xl flex-col sm:flex-row p-6 gap-4"
        >
          <div className="skeleton w-full sm:w-48 h-48 rounded-xl" />
          <div className="flex-1 space-y-4">
            <div className="skeleton h-8 w-3/4" />
            <div className="skeleton h-6 w-1/2" />
            <div className="skeleton h-10 w-24 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

const DataLoadingState = ({
  variant = 'loading',
  onRetry,
  error,
  className = '',
}) => {
  if (variant === 'loading') {
    return (
      <div
        className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
      >
        <span className="loading loading-spinner loading-lg text-primary" />
        <p className="mt-4 text-lg font-medium text-base-content">
          Loading data...
        </p>
        <p className="mt-2 text-sm text-base-content/70 max-w-md">
          {WAKE_UP_HINT}
        </p>
      </div>
    );
  }

  const wakingUp = isServerWakingUp(error);
  const message = error ? getApiErrorMessage(error) : 'Failed to load data.';

  return (
    <div
      className={`flex flex-col items-center justify-center py-16 px-4 text-center ${className}`}
    >
      <p className="text-lg font-medium text-base-content">
        {wakingUp ? 'Server is starting up' : 'Could not load data'}
      </p>
      <p className="mt-2 text-sm text-base-content/70 max-w-md">{message}</p>
      {wakingUp && (
        <p className="mt-2 text-sm text-base-content/60 max-w-md">
          {WAKE_UP_HINT}
        </p>
      )}
      {onRetry && (
        <button type="button" className="btn btn-primary mt-6" onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
};

export default DataLoadingState;
