'use client';
// import { useState } from "react";
import { Provider } from 'react-redux';
// import { ConfiguratorContext } from "@/context/WebConfigurator";
import { store } from '@/common/data/redux/store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // const [theme, setTheme] = useState<any>(); // When the theme state changes, this effect will update the CSS variables in the document's root element

  return (
    <Provider store={store}>
      {/* <ConfiguratorContext.Provider
        value={{
          theme,
          setTheme,
        }}
      > */}
      {children}
      {/* </ConfiguratorContext.Provider> */}
    </Provider>
  );
}
