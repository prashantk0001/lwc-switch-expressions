# lwc-switch-expressions

```
<c-lwc-switch expression="this.a" scope={scope}>
    <c-lwc-case value="4">
        <div>Print Something</div>
    </c-lwc-case>
    <c-lwc-case value="5">
        <div>Print Something else</div>
    </c-lwc-case>
    <c-lwc-case default>
        <div>Print Default</div>
    </c-lwc-case>
</c-lwc-switch>
```
isn't it something new within component based rendering mechanism?

Essentially Switch-Case within LWC!!

Here's a quick example! 

`In template:`
```
<c-lwc-switch expression="this.a" scope={scope}>
    <c-lwc-case value="4">
        <div>44444444444444444444</div>
    </c-lwc-case>
    <c-lwc-case value="5">
        <div>55555555555555555555555555</div>
    </c-lwc-case>
    <c-lwc-case default>
        <div>DEFAAAAAAAAAAAULTTTTTTTTTTT</div>
    </c-lwc-case>
</c-lwc-switch>
```
`In JS Controller:`
```
get scope(){
    return {
        a : this.a,
        b : this.b
    }
}
```

So for complex,multiple rendering scenarios we only need to create a single scope get() property which would contain all the decision making props within the expression, which allows you to write expressions within the templates and makes code more readable & easy to implement.

# Get Started:

You'd find a working example for lwc-switch-expressions in the example module.
     
