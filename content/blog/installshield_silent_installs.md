---
title: "Install Shield Silent Installs"
date: "2009-11-30"
tags: ["installshield"]
slug: "installshield_silent_installs"

---

Install Shield has this nifty feature of being able to install packages in silent mode. This means that you can run _setup.exe_ from the command prompt and it will install in the background with no user interaction. This is very useful if you want to test your installation. If you use some sort of continuous integration system (and you should if you don't) then you could download the latest installer do a silent install and run some tests against the program that is installed, then silent uninstall it all automat(g)ically.

To be able to do silent installs/un-installs you first need to record a response file that contains all the choices for the install shield dialogs.

To record the response file;

> setup.exe -r

This will be like a normal install done manually. Follow it through like you would in any normal installation. After the installer exits, the response file should be at `C:\Windows\setup.iss`

Next time around you can do a silent install by running

> setup.exe -s -f1<path to setup.iss>

I'm paranoid so I use the absolute path to the response file. There is no space between "-f1" and the path to setup.iss. Note that, when you run the
above command to silent install, the command will seem to exit immediately but if you check Task Manager you should see setup.exe (possibly 2 of them) running.

Silent un-installation is pretty much the same. You need to create a response file first. To do this run the following;

> setup.exe -r -uninst -removeonly

This will again create a _setup.iss_ file in `C:\Windows` I usually rename the uninstall response file as _uninst.iss_. Now you can do silent uninstallation by
running;

> setup.exe -s -uninst -removeonly -f1<path to response file>

Some installers might install the program under different GUID's each time you install it. If this is the case I have found that the above command for uninstallation doesn't work,
as Install Shield doesn't know _what_ to uninstall. The solution is to work out the _UninstallString_ from the Registry (which is what Windows uses to uninstall the program via Add/Remove Software).

Here is a python script that uses the registry module (https://pypi.python.org/pypi/registry/) to find out the full UninstallString. You first need to manually find this string
in your registry by looking under `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall` so that you can pass into this function a unique
string that is present in the UninstallString of your program

EDIT: the following script is quite ugly actually. I have a new version in which I use regobj it makes things easier.

<script src="https://gist.github.com/245264.js?file=uninstall.py"></script>
