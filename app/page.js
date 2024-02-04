import Script from "next/script";
export default function Home() {
  return (
  <div>
        <svg style={{display:"none"}} width="118" height="146" viewBox="0 0 118 146" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path id="matter-path" d="M87.8 87.2V105.8H73V129H53.2V105.8H0.4V88L30 0.199999H50.2L21.8 87.2H53.2V49.2H73V87.2H87.8Z " fill="white"/>
        <path id="matter-path" d="M87.8 87.2V105.8H73V129H53.2V105.8H0.4V88L30 0.199999H50.2L21.8 87.2H53.2V49.2H73V87.2H87.8Z " fill="white"/>

        </svg>
        
        <div id="matter-container"></div>


        <Script src="main.js" />
  </div>
  );
}
