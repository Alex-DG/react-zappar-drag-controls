# ✨ React ThreeJS with Zappar AR ✨

This repository contains an AR example using the Zappar SDK.This specific example uses `react-scripts` to compile and bundle the assets and code, and TypeScript to get full auto-complete and compile-time error checking.

To learn more about [Zappar AR](https://docs.zap.works/universal-ar/)

Project [DEMO](https://react-three-zappar.netlify.app/)

## Running the Project

Once you have cloned this repository, open a terminal in the root directory of this project and follow these steps to get started.

- Install the dependencies by running:

```bash
npm i
```

- Next, run the project using the following command:

```bash
npm run start
```

The `webpack server` tool will host the content locally and give you an address you can open in your browser of your local machine.

It's recommended to launch this project on a mobile device to get the best user experience. If you'd like to try on a mobile device, follow these steps:

1. Ensure the device is on the same local network (e.g. Wifi)
2. Find out the IP address of your computer
3. On your mobile device, visit: `https://YOUR-IP-ADDRESS:PORT` replacing both `YOUR-IP-ADDRESS` and `PORT` (the port is the number after the `:` in the address given by `webpack-dev-server`). Note it's important to type `https` at the start of the address to ensure your device connects over HTTP**S**.

- Create optmised production build:

```bash
npm run build
```

## Experience

- Create new 3D entity as a separate folder or file (i.e: `Face/`)
- Instanciante your new 3D entity from the `World` class (i.e: `this.setFace()`)
- Don't forget to update your entity in the World `update()` function if you need to
