---
title: Preventing Accidental Case Deletions
author: Veeral Patel
authorURL: https://twitter.com/veeralpatel44
authorTwitter: veeralpatel44
---

One of the most infuriating experiences on the web is deleting something accidentally.

[Eric Capuano](https://twitter.com/eric_capuano), in fact, raised an issue on [TheHive Project](https://github.com/TheHive-Project/TheHive)'s GitHub repo where he mentioned he'd accidentally deleted a case at "4am after a 12 hour IR" using the tool, and that several of his analysts had deleted cases after confusing task deletion for case deletion.

Today, I'm happy to roll out several protections against deleting cases accidentally in [True Positive](https://www.truepositive.app/), a case management tool I'm working on.

## Type to confirm deletion

You must type "DELETE ME" before you can delete a case:

![](https://storage.googleapis.com/tp_landing_page_videos/delete_confirm_modal.png)
