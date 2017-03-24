import { Router, ActivatedRoute } from '@angular/router';

export abstract class BasePane {

  constructor(protected router: Router, protected route: ActivatedRoute) {
  };

  redirectToId(id: string, segment?: string) {
    const urlTree = this.router.parseUrl(this.router.url);
    let idSegment = urlTree.root.children['primary'].segments[1];
    if (segment) {
      urlTree.root.children['primary'].segments.forEach((e, i) => {
        if (e.path === segment) {
          idSegment = urlTree.root.children['primary'].segments[i + 1];
        }
      });
    }

    if (idSegment) {
      // todo find better approach to change id parameter
      idSegment.path = id;
      this.resetSubChildIfNeed(urlTree, segment);
      this.router.navigateByUrl(urlTree, { preserveFragment: true });
    }
    else {
      this.router.navigate([id], { preserveQueryParams: true, relativeTo: this.route });
    }
  }

  resetSubChildIfNeed(urlTree, segment) {
    const subChildSegment = urlTree.root.children['primary'].segments[2];
    const subChildIdSegment = urlTree.root.children['primary'].segments[3];
    if (subChildSegment && subChildIdSegment && !subChildSegment.path.includes(segment) && subChildSegment.path.includes('edit')) {
      subChildIdSegment.path = '0';
    }
  }
}
