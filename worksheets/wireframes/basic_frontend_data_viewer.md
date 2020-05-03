# Wireframe & Justification

This document should help you explain how your user interfaces are designed. You should have a wireframe to give a good overview and some screenshot with simple writeups to justify your designs.

## Wireframe

> This is just an example, please find your own wireframe.

![Wireframe](assets/wireframe-FrontEnd-DataViewer.png)

## Justifications

### Justification 1

> This is just an example, please find your own justifications.

![Justificaiton1](https://www.jquery-az.com/wp-content/uploads/2016/05/39.0_1-Bootstrap-data-table.png)

#### Good Points

1. Attributes shown at top and bottom can be useful for big table.
2. Showing total number of entries can be useful for some instance.
3. Pagination tool meets requirement

#### Bad Points

1. May need more than 1 search bar as we need to search by multiple attributes
2. Data with many column may be bad.

![Justificaiton2](https://d2jq2hx2dbkw6t.cloudfront.net/214/data-view-laravel-vuejs.png)

#### Good Points

1. Table can be sorted from ascending or descending order. 
2. Unique sorting mechanic, it allows the user to sort based on two types, the column type and the option type. If the column is a int, the options will be symbols. If the     colum is a string, the options will be more varied. The user then enters an input into the search filter and filters based on the 2 preferences provided.
3. Adaptable pagination, user can modify the amount of rows per page and even go to a specific page by typing the page number in the page box

#### Bad Points

1. The second search filter type may be more limiting as it is based on the first search filter type. For example, if the user selects id for the caolumn type, the user can only choose between =, <, >, >=, <=, etc. Or if the user chooses say name, they get the option to choose filters like FIND, LIKE which finds the exact match or finds names that contains whatever the user inputs. This con can be overwritten by manually defining more filter types/enums.

![Justificaiton3](https://www.similarweb.com/images/home/sections/home-pro-slide-5.png)

#### Good Points

1. Table can be sorted from top to bottom
2. Graphically displays data, data is displayed as filled progress bars based on the % of specified data. Looks good to the eyes compared to staring at a table full of data.

#### Bad Points

1. May need more than 1 search bar as we need to search by multiple attributes
