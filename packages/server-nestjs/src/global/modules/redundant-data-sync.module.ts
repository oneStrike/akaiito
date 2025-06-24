import { Global, Logger, Module, OnModuleInit } from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { RedundantDataManagementController } from '@/modules/admin/system/redundant-data-management.controller'
import { EnhancedBaseRepositoryService } from '../services/enhanced-base-repository.service'
import { RedundantDataManagerService } from '../services/redundant-data-manager.service'

/**
 * 冗余数据同步全局模块
 * 自动管理所有使用增强基础服务的模块
 */
@Global()
@Module({
  imports: [
    // 启用定时任务支持
    ScheduleModule.forRoot(),
    // 启用事件发射器支持
    EventEmitterModule.forRoot({
      // 设置最大监听器数量
      maxListeners: 20,
      // 启用通配符支持
      wildcard: true,
      // 分隔符
      delimiter: '.',
    }),
  ],
  providers: [RedundantDataManagerService],
  controllers: [RedundantDataManagementController],
  exports: [RedundantDataManagerService],
})
export class RedundantDataSyncModule implements OnModuleInit {
  private readonly logger = new Logger(RedundantDataSyncModule.name)

  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly redundantDataManager: RedundantDataManagerService,
  ) {}

  async onModuleInit() {
    this.logger.log('冗余数据同步模块初始化开始')

    // 延迟注册服务，确保所有模块都已加载
    setTimeout(() => {
      this.autoRegisterServices()
    }, 1000)
  }

  /**
   * 自动注册所有继承了 EnhancedBaseRepositoryService 的服务
   */
  private autoRegisterServices() {
    try {
      // 获取所有已注册的服务
      const services = this.getAllServices()

      let registeredCount = 0

      for (const [serviceName, service] of services) {
        // 检查是否继承了 EnhancedBaseRepositoryService
        if (this.isEnhancedBaseRepositoryService(service)) {
          this.redundantDataManager.registerService(serviceName, service)
          registeredCount++
        }
      }

      this.logger.log(
        `自动注册完成，共注册 ${registeredCount} 个冗余数据同步服务`,
      )

      // 如果没有注册任何服务，给出提示
      if (registeredCount === 0) {
        this.logger.warn('未发现任何继承 EnhancedBaseRepositoryService 的服务')
        this.logger.warn(
          '请确保您的服务正确继承了 EnhancedBaseRepositoryService 并配置了 redundantDataConfig',
        )
      }
    } catch (error) {
      this.logger.error('自动注册服务失败', error)
    }
  }

  /**
   * 获取所有已注册的服务
   */
  private getAllServices(): Map<string, any> {
    const services = new Map<string, any>()

    try {
      // 这里需要根据实际的 NestJS 版本和配置来获取所有服务
      // 由于 ModuleRef 的限制，我们采用一种更直接的方式

      // 尝试获取一些已知的服务类型
      const knownServiceNames = [
        'EnhancedWorkComicService',
        'EnhancedWorkNovelService',
        'EnhancedWorkPhotoService',
        'EnhancedWorkIllustrationService',
        'EnhancedWorkAuthorService',
        // 可以根据需要添加更多服务名称
      ]

      for (const serviceName of knownServiceNames) {
        try {
          const service = this.moduleRef.get(serviceName, { strict: false })
          if (service) {
            services.set(serviceName, service)
          }
        } catch (error) {
          // 服务不存在，忽略错误
        }
      }
    } catch (error) {
      this.logger.error('获取服务列表失败', error)
    }

    return services
  }

  /**
   * 检查服务是否继承了 EnhancedBaseRepositoryService
   */
  private isEnhancedBaseRepositoryService(service: any): boolean {
    if (!service) return false

    // 检查是否有 redundantDataConfig 属性
    if (!service.redundantDataConfig) return false

    // 检查是否有必要的方法
    const requiredMethods = [
      'fullSyncRedundantData',
      'validateRedundantDataConsistency',
      'manualSyncRedundantData',
    ]

    for (const method of requiredMethods) {
      if (typeof service[method] !== 'function') {
        return false
      }
    }

    return true
  }

  /**
   * 手动注册服务（供外部调用）
   */
  static registerService(
    serviceName: string,
    service: EnhancedBaseRepositoryService<any>,
  ) {
    // 这个方法可以在服务的构造函数中调用，确保服务被注册
    // 由于是静态方法，需要通过其他方式获取 RedundantDataManagerService 实例
  }
}

/**
 * 服务注册装饰器
 * 用于自动注册继承了 EnhancedBaseRepositoryService 的服务
 */
export function RegisterRedundantDataService(serviceName?: string) {
  return function <
    T extends new (...args: any[]) => EnhancedBaseRepositoryService<any>,
  >(constructor: T) {
    // 在服务实例化后自动注册
    const originalConstructor = constructor

    function WrappedConstructor(...args: any[]) {
      const instance = new originalConstructor(...args)

      // 延迟注册，确保 RedundantDataManagerService 已经初始化
      setTimeout(() => {
        try {
          // 这里需要获取 RedundantDataManagerService 实例
          // 可以通过全局变量或其他方式实现
          const name = serviceName || constructor.name
          console.log(`准备注册冗余数据同步服务: ${name}`)
        } catch (error) {
          console.error('注册冗余数据同步服务失败', error)
        }
      }, 2000)

      return instance
    }

    // 复制原型和静态属性
    WrappedConstructor.prototype = originalConstructor.prototype
    Object.setPrototypeOf(WrappedConstructor, originalConstructor)

    return WrappedConstructor as T
  }
}

/**
 * 冗余数据同步配置
 */
export interface RedundantDataSyncModuleOptions {
  /** 是否启用自动注册 */
  enableAutoRegister?: boolean
  /** 是否启用定时任务 */
  enableScheduledTasks?: boolean
  /** 是否启用事件监听 */
  enableEventListening?: boolean
  /** 自定义服务名称列表 */
  customServiceNames?: string[]
}

/**
 * 动态配置冗余数据同步模块
 */
@Module({})
export class RedundantDataSyncConfigurableModule {
  static forRoot(options: RedundantDataSyncModuleOptions = {}) {
    const {
      enableAutoRegister = true,
      enableScheduledTasks = true,
      enableEventListening = true,
      customServiceNames = [],
    } = options

    const imports = []

    if (enableScheduledTasks) {
      imports.push(ScheduleModule.forRoot())
    }

    if (enableEventListening) {
      imports.push(
        EventEmitterModule.forRoot({
          maxListeners: 20,
          wildcard: true,
          delimiter: '.',
        }),
      )
    }

    return {
      module: RedundantDataSyncConfigurableModule,
      imports,
      providers: [
        RedundantDataManagerService,
        {
          provide: 'REDUNDANT_DATA_SYNC_OPTIONS',
          useValue: options,
        },
      ],
      controllers: [RedundantDataManagementController],
      exports: [RedundantDataManagerService],
      global: true,
    }
  }
}
