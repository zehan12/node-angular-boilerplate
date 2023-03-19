import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Data, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Breadcrumb } from '../../shared/models/Breadcrumb';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbService {

  // // Subject emitting the breadcrumb hierarchy
  // private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  // // Observable exposing the breadcrumb hierarchy
  // readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  // constructor(private router: Router) {
  //   this.router.events.pipe(
  //     // Filter the NavigationEnd events as the breadcrumb is updated only when the route reaches its end
  //     filter((event) => event instanceof NavigationEnd)
  //   ).subscribe(event => {
  //     // Construct the breadcrumb hierarchy
  //     const root = this.router.routerState.snapshot.root;
  //     const breadcrumbs: Breadcrumb[] = [];
  //     this.addBreadcrumb(root, [], breadcrumbs);

  //     // Emit the new hierarchy
  //     this._breadcrumbs$.next(breadcrumbs);
  //   });
  // }

  // private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: Breadcrumb[]) {
  //   if (route) {
  //     // Construct the route URL
  //     const routeUrl = parentUrl.concat(route.url.map(url => url.path));

  //     // Add an element for the current route part
  //     if (route.data['breadcrumb']) {
  //       const breadcrumb = {
  //         label: this.getLabel(route.data),
  //         url: '/' + routeUrl.join('/')
  //       };
  //       breadcrumbs.push(breadcrumb);
  //     }

  //     // Add another element for the next route part
  //     this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
  //   }
  // }

  // private getLabel(data: Data) {
  //   // The breadcrumb can be defined as a static string or as a function to construct the breadcrumb element out of the route data
  //   return typeof data['breadcrumb'] === 'function' ? data['breadcrumb'](data) : data['breadcrumb'];
  // }

  // Subject emitting the breadcrumb hierarchy
  private readonly _breadcrumbs$ = new BehaviorSubject<Breadcrumb[]>([]);

  // Observable exposing the breadcrumb hierarchy
  readonly breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor(private router: Router) {
    this.router.events
      .pipe(
        // Filter the NavigationEnd events as the breadcrumb is updated only when the route reaches its end
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        // Get the url "/page-1/page-2"
        const root = this.router.routerState.snapshot.root;

        // Create empty breadcrumb array
        const breadcrumbs: Breadcrumb[] = [];

        // Make first call to addBreadcrumb function
        this.addBreadcrumb(root.firstChild!, [], breadcrumbs);

        // Emit the new hierarchy
        this._breadcrumbs$.next(breadcrumbs);
      });
  }

  buildDepth(iterations: number, constituentFolders: string[]) {
    // This module builds links from the various preceeding folders
    // /page-1
    // /page-1/page-2
    // /page-1/page-2/page-3

    var depthStr = '';

    for (let i = 1; i <= iterations; i++) {
      // Add each of the folders to the string
      depthStr = depthStr + '/' + constituentFolders[i];
    }

    return depthStr;
  }

  private addBreadcrumb(
    route: ActivatedRouteSnapshot,
    parentUrl: string[],
    breadcrumbs: Breadcrumb[]
  ) {
    if (route) {
      // Get the route url
      const routeUrl = parentUrl.concat(route.url.map((url) => url.path));

      // Break the route into seperate folders /page-1/page-2/ becomes and array of [page-1], [page-2]
      let constituentFolders: string[] = new Array();
      constituentFolders = routeUrl.toString().split(',');

      // I need to add 'home' route at the start to match with the empty '' url.
      constituentFolders.splice(0, 0, 'home');

      // Iterate over the folders, building breadcrumb links for each part of the url.
      // Don't do the last folder as that's the current page.
      for (let i = 0; i < constituentFolders.length; i++) {
        // Add a breadcrumb link
        const breadcrumb = {
          label: this.getLabel(constituentFolders[i]),
          url: this.buildDepth(i, constituentFolders),
        };
        breadcrumbs.push(breadcrumb);

        // Recursive call to next element in the route.
        // pass in the route's first child.
        this.addBreadcrumb(route.firstChild!, routeUrl, breadcrumbs);
      }
    }
  }

  getLabel(input: string) {
    // get the label name from the folder taken from the route
    // page-1 becomes "page 1"
    return input.replace(/-/g, ' ');
  }
}