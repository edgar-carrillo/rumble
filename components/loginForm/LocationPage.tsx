import { useState, useEffect, useCallback } from 'react';

// Assets
import loginFormModels from '../../scripts/models/loginForm';

// Components
import LoginPageLayout from './LoginPageLayout';
import InputContainer from './input/InputContainer';
import SelectionContainer from './selection/SelectionContainer';

interface LocationPageProps {
  readonly isVisible: Boolean;
  readonly goPrevPage: () => void;
  readonly goNextPage: () => void;
  readonly userLocation?: string;
};

export default function LocationPage({
  isVisible, goPrevPage, goNextPage, userLocation,
}: LocationPageProps) {
  const [validEntry, setValidEntry] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const formatLocations = (items: any) => {
    return items.map((item: any) => {
      return loginFormModels.formatLocationName(item);
    });
  };

  const populateLocationEntries = useCallback((location: string, isValid: Boolean) => {
    if (isValid) {
      loginFormModels.getLocations(location)
        .then((response: any) => {
          let formattedLocation = response.map((location: any) => {
            return location['matching_full_name'];
          });
          setLocations(formattedLocation);
        })
        .catch((err) => {
          console.error(err);
          setLocations([]);
        })
    } else {
      setLocations([]);
    }
  }, []);

  const entryHandler = useCallback((isValid: Boolean, text: string) => {
    setValidEntry(validEntry === isValid ? validEntry : !validEntry);
    populateLocationEntries(text, isValid);
  }, [validEntry, populateLocationEntries]);

  const locationHandler = (index: number) => {
    if (locations.length) setSelectedLocation(locations[index]);
  };

  useEffect(() => {
    if (!locations.length) setSelectedLocation('');
  }, [locations]);

  return (
    <LoginPageLayout
      isVisible={isVisible}
      goPrevPage={goPrevPage}
      goNextPage={goNextPage}
      title="Choose location"
      description="This tailors what restaurants we'll show you on Rumble."
      isValidEntry={validEntry && selectedLocation.length > 0}
    >
      <div className="flex-1">
        <InputContainer
          labelText="Location"
          errorHandler={loginFormModels.locationErrorHandler}
          inputType="search"
          entryHandler={entryHandler}
          inputText={selectedLocation}
        />
        <SelectionContainer
          items={formatLocations(locations)}
          selectionHandler={locationHandler}
        />
      </div>
    </LoginPageLayout>
  );
}
