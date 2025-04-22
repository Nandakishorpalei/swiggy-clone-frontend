import React from "react";
import { Button } from "../Button/Button";
import { ConditionalLink } from "../ConditionalLink/ConditionalLink";

const ErrorScreen = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-6 bg-surface-background">
      <img
        src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_476,h_476/portal/m/location_unserviceable.png"
        alt="ErrorImage"
        className="h-64"
      />
      <div className="space-y-3 text-center">
        <div className="text-body-lg">Oops! Something went wrong</div>
        <div className="text-body">
          There was an error while processing your request. Please try again
          later.
        </div>
      </div>
      <div className="flex gap-4">
        <ConditionalLink redirect="/">
          <Button customType="secondary">
            <span className="text-surface-navbarText">Home</span>
          </Button>
        </ConditionalLink>
        <Button onClick={() => window.location.reload()} customType="primary">
          Refresh
        </Button>
      </div>
    </div>
  );
};

export default ErrorScreen;
