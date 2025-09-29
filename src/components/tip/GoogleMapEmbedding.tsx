"use client";

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import React from "react";
import { Place } from "@/types";

const googleMapsUrl = process.env.NEXT_PUBLIC_API_GOOGLE_MAPS;
const mapId = process.env.NEXT_PUBLIC_MAP_ID

interface GoogleMapsProps {
  place?: Place;
}

export default function GoogleMapEmbedding({ place }: GoogleMapsProps) {
  if (!place?.latitude || !place?.longitude) return;

  const position = { lat: place?.latitude, lng: place?.longitude };
  const [open, setOpen] = React.useState(false);
  return (
    <div className="flex flex-col">
      <span className="text-2xl uppercase font-bold pb-5 block text-[var(--text-basic)]">
        Where is it ?
      </span>
      <APIProvider apiKey={googleMapsUrl || ''}>
        <div className="w-full flex justify-center">
          <div className="h-[20rem] w-[20rem] sm:w-[30rem] sm:h-[30rem] flex flex-col items-center rounded-2xl overflow-hidden shadow-md">
            <Map zoom={15} center={position} mapId={mapId || '' }>
              <AdvancedMarker position={position} onClick={() => setOpen(true)}>
                <Pin
                  background={"var(--text-orange)"}
                  borderColor={"var(--hover-orange)"}
                  glyphColor={"var(--text-basic)"}
                />
              </AdvancedMarker>

              {open && (
                <InfoWindow
                  position={position}
                  onCloseClick={() => setOpen(false)}
                >
                  <p>I'm there</p>
                </InfoWindow>
              )}
            </Map>
          </div>
        </div>
      </APIProvider>
    </div>
  );
}
