## Code Review Exercise

Write your code review here in markdown format. 

### Issue 1: Dysfunctional Form Buttons
At the end of the site, where a form is attached to ask for more cat facts, neither the reset 
button nor the submit button do anything. This is because the button elements were left outside 
the form element. Although they sit in the appropriate place in the container, they need to be
inside the form.

Initial code:
```
<form>
...
</form>
<div
class="form space-evenly-distributed-row-container form-buttons-container"
>
<input class="form-button" type="submit" value="submit" />
<input class="form-button" type="reset" value="reset" />
</div>
```

New code:
```
<form>
...
<div
class="form space-evenly-distributed-row-container form-buttons-container"
>
<input class="form-button" type="submit" value="submit" />
<input class="form-button" type="reset" value="reset" />
</div>
</form>
```

### Issue 2: Accessibility (Empty Button)

Much like the example in the exercise instructions, there are two buttons which lack any aria label
or title, and are therefore empty. These are the buttons for closing the info modals for "learn more",
for which two were unlabeled.

Old code:
```
<button class="close-popup-button">
```

New code:
```
<button class="close-popup-button" aria-label="close popup window" title="close popup window">
```

## Dysfunctional Load New Cat Facts
Several separate issues are causing the "load new cat facts" section to behave incorrectly.
### Issue 3: Loading Container not found for Load New Cat Facts
In the function `createLoadingContainer`, the intended loading gif never appears. In fact, this
function always causes an error, because for whatever reason the `document.querySelector` is failing
to find the element. Since there is only one loading container concerned, it is more robust and
specific (and efficient) to give the element an ID and get it by ID. Upon making this change,
the error goes away and the element is found.

Old code:
```
const loadingContainer = document.querySelector(".loading-container")
```

New code:
```
const loadingContainer = document.getElementById("cat-facts-loading-container")
```

### Issue 4: Loading symbol never appears for Load New Cat Facts
Additionally, the function to get new cat facts sets the loading container to have the class
"display none," which is never removed or disabled while new cat facts are loading. As such,
the loading symbol is never visible. To fix this, during the function to create a loading
container, remove the class "display none". 

Old code:
```
else 
  {
    loadingContainer.append(loader);
  }
```

New code:
```
else 
  {
    loadingContainer.append(loader);
    loadingContainer.classList.remove('display-none');
  }
```

### Issue 5: Loading symbol copies infinitely accumulate in the loading container after each iteration
Because every time the loading symbol is brought up, the element is appended with the loading image again,
but the image is never removed, it accumulates infinitely. To stop this from happening, remove all children
from the loading container when it's time to hide it.

Old code:
```
finally {
    const loading = document.getElementById('cat-facts-loading-container');
    loading.setAttribute('class', 'display-none');
  }
```

New code:
```
finally {
    const loading = document.getElementById('cat-facts-loading-container');
    loading.setAttribute('class', 'display-none');
    loading.replaceChildren();
  }
```

### Issue 6: Cat facts are the same facts every time they are loaded
In the old version, the endpoint call gets a list of cat facts, but it's always the same facts.
Since the button said "get new cat facts," it should get new facts. According to Postman,
the catfact.ninja API doesn't support randomization for the facts (plural) endpoint, but the fact
(singular) endpoint does return a RANDOM fact. Therefore, use it 10 times to get a list of random
facts.

Old code:
```
const response = await fetch('https://catfact.ninja/facts?limit=10');
const data = await response.json();
```

New code:
```
const promises = Array.from({ length: 10 }, () => 
    fetch('https://catfact.ninja/fact').then(res => res.json())
);

const combinedData = await Promise.all(promises);
```

