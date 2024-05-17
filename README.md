# Website

A full-stack implementation of my personal website, using the following technologies:

* Docker
* htmx
* hyperscript
* NGINX
* LetsEncrypt / Certbot
* ASP.NET MVC
* gitlab ci/cd. viewable on the [upstream gitlab repo](https://gitlab.com/haondt/website)

### Development

To run locally, just open the visual studio project and run. Requires docker.

```shell
cd deploy
docker compose -f docker-compose.dev.yml up -d
```

# History

I think it's interesting to keep a history of the evolution of this site.

<details>
    <summary>Expand history</summary>

##  v1: HTML + CSS

<img src="./img/v1_home.png" width="350">
<img src="./img/v1_about.png" width="350">
<img src="./img/v1_projects.png" width="350">

This version was pure, artisinally-crafted, free-range, handmade html and css, my first website ever. The design language was influenced by Windows 10, and featured sharp corners and bold text, with a black and purple color scheme. Most of the buttons used icons to communicate information rather than text.

## v2: React

This version looked pretty much identical to v1, but it was rebuild in react. Being a SPA, loading different pages was a bit smoother.

## v3: Angular

<img src="./img/v3_home.png" width="350">
<img src="./img/v3_about.png" width="350">
<img src="./img/v3_projects.png" width="350">

v3 introduced a new black and gold colorscheme. The "black" is actually a very, very dark purple. Built with Angular Material, the design language in this version draws a lot more inspiration from Google material design. This version also introduced image carousels and modals to view the project page images in detail. v3 had a vertical navigation bar, which was visually nicer than the v1/v2 navigation, but was retrospectively worse UX. Additional the space eaten up by the navigation menu caused all sorts of scaling issues on mobile. This version also preferred text over icons to communicate information on buttons and chips.

## v4: .NET + htmx

v4 was built with the goal of reducing dependencies and fixing the shortcomings of v3. This version uses htmx served by ASP.NET MVC to deliver components, and hyperscript for some light scripting. All the UI components are built from scratch with pure css and `.cshtml` templating (distinctly NOT Razor/Blazor). Visually, the design is decidedly basic, taking inspiration from GitHub and Markdown. A big issue with v3 was poor mobile support due to the material components breaking down on smaller screens. v4 was built with mobile support in mind from the start.

I think this version does a good job at taking the best parts of all the previos versions, an horizontal navigation bar, buttons with both text and icons, textual chips, mobile support, a simple design and few dependencies. It uses the same colorscheme as v3, but is much more sparing with the accent color. It also makes liberal use of css transitions, making the site feel smooth and fluid.

</details>
