import { useState, useEffect, useCallback } from 'react';

// Assets
import models from '../../scripts/models/models';

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
  const [isValidEntry, setIsValidEntry] = useState<boolean>(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>(userLocation || '');

  const formatLocations = (items: any) => {
    return items.map((item: any) => {
      return models.loginForm.shortenLocationName(item);
    });
  };

  const updateLocations = (locationName: string) => {
    models.loginForm.getLocations(locationName)
      .then((locationNames: any) => {
        setLocations(locationNames);
      })
      .catch((error) => {
        console.error(`There was an error in retrieving locations: ${error}`);
      });
  };

  const entryHandler = useCallback((isValid: boolean, text: string) => {
    setIsValidEntry(isValid);

    if (!isValid) {
      setLocations([]);
      return;
    };

    updateLocations(text);
  }, []);

  const updateSelectedLocation = useCallback((index: number) => {
    if (index === -1) {
      setSelectedLocation('');
      models.loginForm.updateLocation('');
    } else {
      setSelectedLocation(locations[index]);
      models.loginForm.updateLocation(locations[index]);
    }
  }, [locations]);

  useEffect(() => {
    if (!locations.length) updateSelectedLocation(-1);
  }, [locations, updateSelectedLocation]);

  return (
    <LoginPageLayout
      isVisible={isVisible}
      goPrevPage={goPrevPage}
      goNextPage={goNextPage}
      title="Choose location"
      description="This tailors what restaurants we'll show you on Rumble."
      showButton={isValidEntry && selectedLocation.length > 0}
    >
      <div className="flex-1">
        <InputContainer
          labelText="Location"
          errorHandler={models.loginForm.locationErrorHandler}
          inputType="search"
          entryHandler={entryHandler}
          inputText={userLocation}
        />
        <SelectionContainer
          items={formatLocations(locations)}
          selectionHandler={updateSelectedLocation}
        />
      </div>
    </LoginPageLayout>
  );
}
