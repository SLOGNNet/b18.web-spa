import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable, Injector, ReflectiveInjector, ViewContainerRef,
  ResolvedReflectiveProvider, Type
} from '@angular/core';

@Injectable()
export class TypeaheadUtils {
  public constructor(protected componentFactoryResolver: ComponentFactoryResolver) {
  }

  public getValueFromObject(object: any, option: string): string {
    if (!option || typeof object !== 'object') {
      return object.toString();
    }

    if (option.endsWith('()')) {
      let functionName = option.slice(0, option.length - 2);
      return object[functionName]().toString();
    }

    let properties: string = option.replace(/\[(\w+)\]/g, '.$1')
      .replace(/^\./, '');
    let propertiesArray: Array<string> = properties.split('.');

    for (let property of propertiesArray) {
      if (property in object) {
        object = object[property];
      }
    }
    return object.toString();
  }

  public appendNextToLocation<T>(componentClass: Type<T>,
    location: ViewContainerRef,
    providers?: ResolvedReflectiveProvider[]): ComponentRef<T> {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    let parentInjector = location.parentInjector;
    let childInjector: Injector = parentInjector;
    if (providers && providers.length > 0) {
      childInjector = ReflectiveInjector.fromResolvedProviders(providers, parentInjector);
    }

    return location.createComponent(componentFactory, location.length, childInjector);
  }
}
