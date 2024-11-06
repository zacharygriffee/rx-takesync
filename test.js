import {test} from "brittle";
import {firstValueFrom, Observable, toArray} from "rxjs";
import {takeSync} from "./index.js";

test("takeSync", async t => {
    const observable = new Observable(sub => {
        sub.next("you");
        sub.next("and you");
        setTimeout(() => sub.next("but not you"));
    });

    const result = await firstValueFrom(observable.pipe(takeSync(), toArray()))
    t.alike(result, ["you", "and you"]);
});