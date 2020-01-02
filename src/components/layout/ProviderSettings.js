import React, { useContext } from 'react';

import ProviderContext from '../../store/ProviderContext';

const ProviderSettings = () => {
  const { provider, setProvider } = useContext(ProviderContext);

  return (
    <div className="btn-group btn-group-toggle" data-toggle="buttons">
      <label className="btn btn-secondary btn-sm active">
        {/* It's complaining to was provided a `checked` prop to a form field
       without an `onChange` handler. To satisfy him I made a bare handler.
       We do change nothing on the input, we only change state onClick. */}
        <input
          type="radio"
          name="options"
          value="fire_store"
          checked={provider === 'fire_store'}
          onClick={e => setProvider(e.target.value)}
          onChange={() => {}}
        />
        Cloud Store
      </label>
      <label className="btn btn-secondary btn-sm">
        <input
          type="radio"
          name="options"
          value="local_storage"
          checked={provider === 'local_storage'}
          onClick={e => setProvider(e.target.value)}
          onChange={() => {}}
        />
        Local Storage
      </label>
    </div>
  );
};

export default ProviderSettings;
