import { EnvironmentProviders, importProvidersFrom } from '@angular/core';
import {
    MenuFoldOutline,
    MenuUnfoldOutline,
    FormOutline,
    DashboardOutline,
    UserOutline,
    LockOutline,
    MailOutline
} from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons = [MenuFoldOutline,
    MenuUnfoldOutline,
    DashboardOutline,
    FormOutline,
    UserOutline,
    LockOutline,
    MailOutline
];

export function provideNzIcons(): EnvironmentProviders {
    return importProvidersFrom(NzIconModule.forRoot(icons));
}
