import React, { useState, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { useDispatch, useSelector } from "react-redux";
import {
  getIssInfo,
  selectLatitude,
  selectLongitude,
} from "../slices/issSlice";

import {
  useGLTF,
  Html,
  OrbitControls,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { BiCurrentLocation } from "react-icons/bi";
import { CiSatellite1 } from "react-icons/ci";

function Model(props) {
  let latitude = useSelector(selectLatitude);
  let longitude = useSelector(selectLongitude);
  const { nodes, materials } = useGLTF("/earth.gltf");
  return (
    <group rotation={[0, 0, 0]} {...props} dispose={null}>
      <mesh
        geometry={nodes["URF-Height_Lampd_Ice_0"].geometry}
        material={materials.Lampd_Ice}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes["URF-Height_watr_0"].geometry}
        material={materials.watr}
        material-roughness={0}
        rotation={[-Math.PI / 2, 0, 0]}
      />
      <mesh
        geometry={nodes["URF-Height_Lampd_0"].geometry}
        material={materials.Lampd}
        material-color="lightgreen"
        rotation={[-Math.PI / 2, 0, 0]}
      >
        {/* Switch y and z as model is turned 90 degree */}
        <group
          position={[props.xyz.x, props.xyz.z, props.xyz.y]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <Marker rotation={[0, 0, Math.PI / 2]}>
            <BiCurrentLocation name="CiSatellite1" style={{ width: 5 }} />

            <CiSatellite1 name="CiSatellite11" style={{ width: 5 }} />
            <div style={{ fontSize: 2, position: "absolute", left: 12 }}>
              <p>Lattitude: {latitude}</p>
              <p>Longitude: {longitude}</p>
            </div>
          </Marker>
        </group>
      </mesh>
    </group>
  );
}

// Let's make the marker into a component so that we can abstract some shared logic
function Marker({ children, ...props }) {
  // This holds the local occluded state
  const [occluded, occlude] = useState();
  return (
    <Html
      // 3D-transform contents
      transform
      // Hide contents "behind" other meshes
      occlude
      // Tells us when contents are occluded (or not)
      onOcclude={occlude}
      // We just interpolate the visible state into css opacity and transforms
      style={{
        transition: "all 0.2s",
        opacity: occluded ? 0 : 1,
        transform: `scale(${occluded ? 0.25 : 1})`,
        display: "flex",
        flexDirection: "row",
        height: 8,
        // justifyContent: "flex-start",
        // alignItems: "flex-start",
        // alignSelf: "flex-start",
        // width: 100,
      }}
      {...props}
    >
      {children}
    </Html>
  );
}

export default function Globe() {
  let latitude = useSelector(selectLatitude);
  let longitude = -useSelector(selectLongitude);
  //   let latitude = 0;
  //   let longitude = -0;
  let defaultRadius = 1.4;
  const [xyz, setXYZ] = useState(getXYZ(latitude, longitude, defaultRadius));

  function getXYZ(lat, lng, radius) {
    radius = radius || defaultRadius;

    // var latRads = ((90 - lat) * Math.PI) / 180;
    // var lngRads = ((180 - lng) * Math.PI) / 180;

    // var x = radius * Math.sin(latRads) * Math.cos(lngRads);
    // var y = radius * Math.cos(latRads);
    // var z = radius * Math.sin(latRads) * Math.sin(lngRads);

    // lat = lat + 190;
    lng = lng - 115;
    var phi = (90 - lat) * (Math.PI / 180);
    var theta = (lng + 180) * (Math.PI / 180);

    let x = -(radius * Math.sin(phi) * Math.cos(theta));
    let z = radius * Math.sin(phi) * Math.sin(theta);
    let y = radius * Math.cos(phi);
    console.log("x, y, z", x, y, z);
    return { x: x, y: y, z: z };
  }

  useEffect(() => {
    setXYZ(getXYZ(latitude, longitude, defaultRadius));
    console.log("xyz", xyz);
  }, [latitude, longitude]);

  return (
    <Canvas camera={{ position: [5, 0, 0], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <Model position={[0, 0.5, 0]} xyz={xyz} />
      <Environment preset="city" />
      <ContactShadows
        frames={1}
        scale={5}
        position={[0, -1, 0]}
        far={1}
        blur={5}
        opacity={0.5}
        color="#204080"
      />
      <OrbitControls />
    </Canvas>
  );
}
