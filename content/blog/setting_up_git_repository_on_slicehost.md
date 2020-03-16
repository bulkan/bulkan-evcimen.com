---
title: "Setting up a git repository on Slicehost"
date: "2008-12-28"
tags: ["slicehost", "git"]
slug: "setting_up_git_repository_on_slicehost"

---

On your slice;
----------------

1.  Install git.

    > sudo apt-get install git-core

2. Create an empty directory for your repository

    > mkdir myrepo.git && cd myrepo.git

3. Initialize git

    > git init


On your local machine
-------------------------

1. Create an empty directory for your repository

     > mkdir myrepo.git && cd myrepo.git

2. Initialize git

    > git init

3.  Add the remote repository as the origin

    > git remote add origin ssh://server-domain/repo

    for my server the above command is

    > git remote add origin ssh://bulkan-evcimen.com/home/bulkan/src/repo.git

4. Create a ignore file for the first push

    > touch .gitignore

5.  Add, commit

    > git add .gitignore

    > git commit -m "initial git commit"

6. Push your repo to the origin on slicehost

    > git push origin master

That's it. Happy gitting.
